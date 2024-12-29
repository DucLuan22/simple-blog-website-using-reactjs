import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Get,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('upload')
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.postService.create(createPostDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create post',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Get()
  async getPosts() {
    try {
      return await this.postService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to fetch posts',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Get(':id')
  async getPost(@Param('id') id: string) {
    try {
      return await this.postService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
  }

  @Public()
  @Post(':postId/view')
  async updateViewCount(@Param('postId') postId: string): Promise<number> {
    try {
      return await this.postService.updatePostViewCount(postId);
    } catch (error) {
      throw new NotFoundException(
        `Failed to update views for post with ID "${postId}"`,
      );
    }
  }

  @Public()
  @Get('stats/daily')
  async getTopDailyViewedPosts() {
    try {
      return await this.postService.getTopDailyViewedPosts();
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message || 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:user_id')
  async getPostsByUserId(@Param('user_id') user_id: string) {
    try {
      return await this.postService.getPostsByUserId(user_id);
    } catch (error) {
      throw new NotFoundException(
        `Failed to fetch posts for user ID "${user_id}"`,
      );
    }
  }

  @Delete('delete')
  async deletePost(@Body() body: { post_id: string; user_id: string }) {
    try {
      return await this.postService.deletePost(body.post_id, body.user_id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to delete post',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('edit-post/:id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return await this.postService.update(id, updatePostDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to update post',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Get('/category/:category_id')
  async getPostsByCategory(@Param('category_id') category_id: number) {
    try {
      return await this.postService.getPostByCategory(category_id);
    } catch (error) {
      throw new NotFoundException(
        `Failed to fetch posts for category ID "${category_id}"`,
      );
    }
  }

  @Public()
  @Get('/getRandomPosts')
  async getRandomPosts() {
    try {
      return await this.postService.getRandomPost();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch random posts',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Get('home/get-users-choice-posts')
  async getUserChoicePosts() {
    try {
      return await this.postService.getTopBookmarkedPosts();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch user choice posts',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Get('/search/:keywords')
  async getSearchedPosts(@Param('keywords') keywords: string) {
    try {
      return await this.postService.searchPostsByTitle(keywords);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to search posts',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
