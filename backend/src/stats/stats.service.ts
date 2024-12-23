import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/typeorm/entities/bookmark.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { PostView } from 'src/typeorm/entities/post-view.entity';
import { Post } from 'src/typeorm/entities/post.entity';
import { Share } from 'src/typeorm/entities/share.entity';
import { Repository } from 'typeorm';

export interface ViewCountData {
  date: string;
  total_views: number;
}

export interface ViewCountCombineDate {
  chart_data:
    | {
        monthlyViews: ViewCountData[];
        yearlyViews: ViewCountData[];
      }
    | undefined;
}
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

  async getYearlyViews(user_id: number): Promise<ViewCountData[]> {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().slice(0, 7);
    }).reverse();

    const yearlyViews: ViewCountData[] = await Promise.all(
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
          date: month,
          total_views: totalViews?.total_views || 0,
        };
      }),
    );

    return yearlyViews;
  }

  async getMonthlyViews(user_id: number): Promise<ViewCountData[]> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    const monthlyViews: ViewCountData[] = await Promise.all(
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
          date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          total_views: totalViews?.total_views || 0,
        };
      }),
    );

    return monthlyViews;
  }

  async getViews(user_id: number): Promise<ViewCountCombineDate> {
    const [yearlyViews, monthlyViews] = await Promise.all([
      this.getYearlyViews(user_id),
      this.getMonthlyViews(user_id),
    ]);

    return {
      chart_data: {
        yearlyViews,
        monthlyViews,
      },
    };
  }

  async getTodayStatsByUserId(user_id: number) {
    const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

    const stats = await this.postRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.comments', 'c', 'DATE(c.createdAt) = :today', {
        today,
      })
      .leftJoinAndSelect('p.bookmarks', 'b', 'DATE(b.createdDate) = :today', {
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

  async getPostStatsByUserId(user_id: number) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .addSelect([
        'post.post_id',
        'post.title',
        'post.thumbnail',
        'post.content',
        'post.createDate',
        'post.updateDate',
        'category.category_name',
      ])

      .addSelect([
        `(SELECT SUM(view_count) 
          FROM post_views pv 
          WHERE pv.post_id = post.post_id) AS total_views`,
        `(SELECT SUM(IF(DATE(pv.view_date) = CURDATE(), pv.view_count, 0)) 
          FROM post_views pv 
          WHERE pv.post_id = post.post_id) AS daily_views`,
        `(SELECT SUM(IF(MONTH(pv.view_date) = MONTH(CURDATE()) AND YEAR(pv.view_date) = YEAR(CURDATE()), pv.view_count, 0)) 
          FROM post_views pv 
          WHERE pv.post_id = post.post_id) AS monthly_views`,
        `(SELECT SUM(IF(YEAR(pv.view_date) = YEAR(CURDATE()), pv.view_count, 0)) 
          FROM post_views pv 
          WHERE pv.post_id = post.post_id) AS yearly_views`,
      ])

      .addSelect([
        `(SELECT COUNT(comment_id) 
          FROM comments c 
          WHERE c.post_id = post.post_id) AS total_comments`,
        `(SELECT SUM(IF(DATE(c.createdAt) = CURDATE(), 1, 0)) 
          FROM comments c 
          WHERE c.post_id = post.post_id) AS daily_comments`,
        `(SELECT SUM(IF(MONTH(c.createdAt) = MONTH(CURDATE()) AND YEAR(c.createdAt) = YEAR(CURDATE()), 1, 0)) 
          FROM comments c 
          WHERE c.post_id = post.post_id) AS monthly_comments`,
        `(SELECT SUM(IF(YEAR(c.createdAt) = YEAR(CURDATE()), 1, 0)) 
          FROM comments c 
          WHERE c.post_id = post.post_id) AS yearly_comments`,
      ])
      // Subqueries for shares
      .addSelect([
        `(SELECT COUNT(share.id) 
          FROM shares share 
          WHERE share.post_id = post.post_id) AS total_shares`,
        `(SELECT SUM(IF(DATE(share.createdDate) = CURDATE(), 1, 0)) 
          FROM shares share 
          WHERE share.post_id = post.post_id) AS daily_shares`,
        `(SELECT SUM(IF(MONTH(share.createdDate) = MONTH(CURDATE()) AND YEAR(share.createdDate) = YEAR(CURDATE()), 1, 0)) 
          FROM shares share 
          WHERE share.post_id = post.post_id) AS monthly_shares`,
        `(SELECT SUM(IF(YEAR(share.createdDate) = YEAR(CURDATE()), 1, 0)) 
          FROM shares share 
          WHERE share.post_id = post.post_id) AS yearly_shares`,
      ])
      // Subqueries for bookmarks
      .addSelect([
        `(SELECT COUNT(bookmark.user_id) 
          FROM bookmarks bookmark 
          WHERE bookmark.post_id = post.post_id) AS total_bookmarks`,
        `(SELECT SUM(IF(DATE(bookmark.createdDate) = CURDATE(), 1, 0)) 
          FROM bookmarks bookmark 
          WHERE bookmark.post_id = post.post_id) AS daily_bookmarks`,
        `(SELECT SUM(IF(MONTH(bookmark.createdDate) = MONTH(CURDATE()) AND YEAR(bookmark.createdDate) = YEAR(CURDATE()), 1, 0)) 
          FROM bookmarks bookmark 
          WHERE bookmark.post_id = post.post_id) AS monthly_bookmarks`,
        `(SELECT SUM(IF(YEAR(bookmark.createdDate) = YEAR(CURDATE()), 1, 0)) 
          FROM bookmarks bookmark 
          WHERE bookmark.post_id = post.post_id) AS yearly_bookmarks`,
      ])
      .where('post.user_id = :user_id', { user_id })
      .groupBy('post.post_id, category.category_name')
      .getRawMany();

    if (!posts.length) {
      throw new NotFoundException('No posts found for this user.');
    }

    return posts.map((post) => ({
      post_id: post.post_id,
      title: post.title,
      thumbnail: post.thumbnail,
      content: post.content,
      created_date: post.createDate,
      updated_date: post.updateDate,
      category_name: post.category_name,
      total_views: +post.total_views,
      daily_views: +post.daily_views,
      monthly_views: +post.monthly_views,
      yearly_views: +post.yearly_views,
      total_comments: +post.total_comments,
      daily_comments: +post.daily_comments,
      monthly_comments: +post.monthly_comments,
      yearly_comments: +post.yearly_comments,
      total_shares: +post.total_shares,
      daily_shares: +post.daily_shares,
      monthly_shares: +post.monthly_shares,
      yearly_shares: +post.yearly_shares,
      total_bookmarks: +post.total_bookmarks,
      daily_bookmarks: +post.daily_bookmarks,
      monthly_bookmarks: +post.monthly_bookmarks,
      yearly_bookmarks: +post.yearly_bookmarks,
    }));
  }

  async getTopBookmarkedPosts(): Promise<any> {
    const lastMonthTopPosts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.bookmarks', 'bookmark')
      .leftJoin('post.category', 'category')
      .leftJoin('post.user', 'user')
      .select([
        'post.post_id AS post_id',
        'category.category_name AS category_name',
        'post.title AS title',
        'user.givenName AS givenName',
        'user.familyName AS familyName',
        'post.createDate AS createDate',
        'COUNT(bookmark.post_id) AS monthly_bookmark_count',
      ])
      .where('bookmark.createdDate >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)')
      .groupBy('post.post_id')
      .orderBy('monthly_bookmark_count', 'DESC')
      .limit(5)
      .getRawMany();

    if (lastMonthTopPosts.length > 0) {
      return lastMonthTopPosts.map((post) => ({
        post_id: post.post_id,
        category_name: post.category_name,
        title: post.title,
        givenName: post.givenName,
        lastName: post.lastName,
        createdDate: post.createdDate,
        bookmark_count: parseInt(post.monthly_bookmark_count, 10),
      }));
    }

    const allTimeTopPosts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.bookmarks', 'bookmark')
      .leftJoin('post.category', 'category')
      .leftJoin('post.user', 'user')
      .select([
        'post.post_id AS post_id',
        'category.category_name AS category_name',
        'post.title AS title',
        'user.givenName AS givenName',
        'user.famiyName AS familyName',
        'post.createDate AS createDate',
        'COUNT(bookmark.post_id) AS total_bookmark_count',
      ])
      .groupBy('post.post_id')
      .orderBy('total_bookmark_count', 'DESC')
      .limit(5)
      .getRawMany();

    return allTimeTopPosts.map((post) => ({
      post_id: post.post_id,
      category_name: post.category_name,
      title: post.title,
      givenName: post.givenName,
      lastName: post.lastName,
      createdDate: post.createdDate,
      bookmark_count: parseInt(post.total_bookmark_count, 10),
    }));
  }
}
