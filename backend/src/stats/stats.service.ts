import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/typeorm/entities/bookmark.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { PostView } from 'src/typeorm/entities/post-view.entity';
import { Post } from 'src/typeorm/entities/post.entity';
import { Share } from 'src/typeorm/entities/share.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(PostView)
    private postViewsRepository: Repository<PostView>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Share) private shareRepository: Repository<Share>,
  ) {}

  async getYearlyViews(user_id: number) {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().slice(0, 7);
    }).reverse();

    const yearlyViews = await Promise.all(
      months.map(async (month) => {
        const [year, monthPart] = month.split('-');
        const totalViews = await this.postViewsRepository
          .createQueryBuilder('pv')
          .innerJoin('pv.post', 'post')
          .where('post.user_id = :user_id', { user_id })
          .andWhere(
            'YEAR(pv.view_date) = :year AND MONTH(pv.view_date) = :month',
            {
              year: +year,
              month: +monthPart,
            },
          )
          .select('COALESCE(SUM(pv.view_count), 0)', 'total_views')
          .getRawOne();

        return {
          month,
          total_views: totalViews?.total_views || 0,
        };
      }),
    );

    return { success: true, data: yearlyViews };
  }

  async getMonthlyViews(user_id: number) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    const dailyViews = await Promise.all(
      Array.from({ length: daysInMonth }, (_, i) => i + 1).map(async (day) => {
        const totalViews = await this.postViewsRepository
          .createQueryBuilder('pv')
          .innerJoin('pv.post', 'post')
          .where('post.user_id = :user_id', { user_id })
          .andWhere(
            'YEAR(pv.view_date) = :year AND MONTH(pv.view_date) = :month AND DAY(pv.view_date) = :day',
            {
              year,
              month,
              day,
            },
          )
          .select('COALESCE(SUM(pv.view_count), 0)', 'total_views')
          .getRawOne();

        return {
          day: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          total_views: totalViews?.total_views || 0,
        };
      }),
    );

    return { success: true, data: dailyViews };
  }

  async getTodayStatsByUserId(user_id: number) {
    const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

    const stats = await this.postRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.comments', 'c', 'DATE(c.createdAt) = :today', {
        today,
      })
      .leftJoinAndSelect('p.bookmarks', 'b', 'DATE(b.createDate) = :today', {
        today,
      })
      .leftJoinAndSelect('p.postViews', 'v', 'DATE(v.view_date) = :today', {
        today,
      })
      .leftJoinAndSelect('p.shares', 's', 'DATE(s.createdDate) = :today', {
        today,
      })
      .where('p.user_id = :user_id', { user_id })
      .select([
        'p.post_id AS post_id',
        'p.title AS title',
        'p.thumbnail AS thumbnail',
        'COALESCE(COUNT(DISTINCT c.comment_id), 0) AS total_comments',
        'COALESCE(COUNT(DISTINCT b.post_id), 0) AS total_bookmarks',
        'COALESCE(SUM(v.view_count), 0) AS total_views',
        'COALESCE(COUNT(DISTINCT s.id), 0) AS total_shares',
      ])
      .groupBy('p.post_id')
      .getRawMany();

    if (!stats.length) {
      return {
        success: true,
        data: [
          {
            post_id: null,
            title: null,
            thumbnail: null,
            total_comments: 0,
            total_bookmarks: 0,
            total_views: 0,
            total_shares: 0,
          },
        ],
      };
    }

    return { success: true, data: stats };
  }
}
