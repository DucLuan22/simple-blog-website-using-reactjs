import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from 'src/typeorm/entities/post.entity';
import { PostView } from 'src/typeorm/entities/post-view.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostView)
    private readonly postViewRepository: Repository<PostView>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { user_id, category_id, ...postData } = createPostDto;

    if (!user_id || !category_id) {
      throw new Error('User ID and Category ID are required');
    }

    const post = this.postRepository.create({
      ...postData,
      user: { id: user_id },
      category: { category_id },
    });
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.user', 'user')
      .leftJoin('posts.viewsDetails', 'postViews')
      .select([
        'posts.post_id As post_id',
        'posts.title As title',
        'posts.thumbnail As thumbnail',
        'posts.content As content',
        'posts.createDate as createDate',
        'posts.updateDate as updateDate',
        'user.givenName as givenName',
        'user.familyName as familyName',
        'category.category_name as category_name',
        'SUM(postViews.view_count) AS views',
      ])
      .groupBy('posts.post_id')
      .orderBy('posts.createDate', 'DESC')
      .getRawMany();
  }

  async findOne(post_id: string): Promise<Post> {
    const post = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.user', 'user')
      .leftJoin('posts.viewsDetails', 'postViews')
      .select([
        'posts.post_id AS post_id',
        'posts.title AS title',
        'posts.thumbnail AS thumbnail',
        'posts.content AS content',
        'posts.createDate AS createDate',
        'posts.updateDate AS updateDate',
        'user.givenName AS givenName',
        'user.familyName AS familyName',
        'category.category_name AS category_name',
        'SUM(postViews.view_count) AS views',
      ])
      .where('posts.post_id = :post_id', { post_id })
      .groupBy('posts.post_id')
      .getRawOne();

    if (!post) {
      throw new NotFoundException(`Post with ID "${post_id}" not found`);
    }

    return post;
  }

  async deletePost(post_id: string, user_id: string): Promise<any> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :post_id', { post_id })
      .andWhere('post.user_id = :user_id', { user_id })
      .getOne();

    if (!post) {
      throw new ForbiddenException(
        'Unauthorized: You do not have permission to delete this post',
      );
    }

    const deleteResult = await this.postRepository.delete(post_id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Post not found');
    }

    return {
      success: true,
      message: 'Post deleted successfully',
    };
  }

  async getPostsByUserId(user_id: string): Promise<any> {
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.user', 'user')
      .leftJoinAndSelect('posts.viewsDetails', 'postViews')
      .select([
        'posts.post_id AS post_id',
        'posts.title AS title',
        'posts.thumbnail AS thumbnail',
        'posts.content AS content',
        'posts.createDate AS createDate',
        'posts.updateDate AS updateDate',
        'user.givenName AS givenName',
        'user.familyName AS familyName',
        'category.category_name AS category_name',
        'category.category_id AS category_id',
        'SUM(postViews.view_count) AS views',
      ])
      .where('posts.user_id = :user_id', { user_id })
      .groupBy('posts.post_id')
      .addGroupBy('category.category_name')
      .addGroupBy('user.givenName')
      .addGroupBy('user.familyName')
      .orderBy('posts.createDate', 'DESC')
      .getRawMany();

    return { data: posts || [] };
  }

  async updatePostViewCount(postId: string): Promise<number> {
    const today = new Date().toISOString().split('T')[0];

    let postView = await this.postViewRepository.findOne({
      where: { post_id: postId, view_date: today },
    });

    if (postView) {
      postView.view_count += 1;
      await this.postViewRepository.save(postView);
    } else {
      postView = this.postViewRepository.create({
        post_id: postId,
        view_date: today,
        view_count: 1,
      });
      await this.postViewRepository.save(postView);
    }

    const totalViews = await this.postViewRepository
      .createQueryBuilder('postView')
      .select('SUM(postView.view_count)', 'totalViews')
      .where('postView.post_id = :postId', { postId })
      .getRawOne();

    return totalViews?.totalViews ?? 0;
  }

  async getPostByCategory(category_id: number): Promise<any> {
    if (!category_id) {
      throw new Error('Category ID is required');
    }

    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.user', 'user')
      .leftJoinAndSelect('posts.viewsDetails', 'postViews')
      .select([
        'posts.post_id AS post_id',
        'posts.title AS title',
        'posts.thumbnail AS thumbnail',
        'posts.content AS content',
        'posts.createDate AS createDate',
        'posts.updateDate AS updateDate',
        'user.givenName AS givenName',
        'user.familyName AS familyName',
        'category.category_name AS category_name',
        'category.category_id AS category_id',
        'SUM(postViews.view_count) AS views',
      ])
      .where('posts.category_id = :category_id', { category_id })
      .groupBy('posts.post_id')
      .addGroupBy('category.category_name')
      .addGroupBy('user.givenName')
      .addGroupBy('user.familyName')
      .orderBy('posts.createDate', 'DESC')
      .getRawMany();

    return { posts: posts || [] };
  }

  async getTopDailyViewedPosts() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const topViewedPosts = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.category', 'category')
      .leftJoinAndSelect('posts.user', 'user')
      .leftJoinAndSelect('posts.viewsDetails', 'postViews')
      .select([
        'posts.post_id AS post_id',
        'posts.title AS title',
        'posts.thumbnail AS thumbnail',
        'posts.content AS content',
        'posts.user_id AS user_id',
        'category.category_name AS category_name',
        'posts.createDate AS createDate',
        'posts.updateDate AS updateDate',
        'posts.views AS views',
        'SUM(postViews.view_count) AS daily_views',
        'user.givenName AS givenName',
        'user.familyName AS familyName',
      ])
      .where('postViews.view_date = :today', { today })
      .groupBy('posts.post_id')
      .addGroupBy('category.category_name')
      .addGroupBy('user.givenName')
      .addGroupBy('user.familyName')
      .orderBy('SUM(postViews.view_count)', 'DESC')
      .limit(5)
      .getRawMany();

    if (topViewedPosts.length > 0) {
      return topViewedPosts;
    }

    return await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.category', 'categories')
      .leftJoinAndSelect('posts.user', 'users')
      .select([
        'posts.post_id AS post_id',
        'posts.title AS title',
        'posts.thumbnail AS thumbnail',
        'posts.content AS content',
        'posts.user_id AS user_id',
        'categories.category_name AS category_name',
        'posts.createDate AS createDate',
        'posts.updateDate AS updateDate',
        'posts.views AS views',
        'users.givenName AS givenName',
        'users.familyName AS familyName',
      ])
      .orderBy('RAND()')
      .limit(5)
      .getRawMany();
  }
  async update(post_id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { post_id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID "${post_id}" not found`);
    }

    // Apply the updates
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }
}
