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
          error: 'Failed to create post',
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to fetch post',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Post(':postId/view')
  async updateViewCount(@Param('postId') postId: string): Promise<number> {
    try {
      const totalViews = await this.postService.updatePostViewCount(postId);
      return totalViews;
    } catch (error) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }
  }

  @Public()
  @Get('stats/daily')
  async getTopDailyViewedPosts() {
    try {
      const topPosts = await this.postService.getTopDailyViewedPosts();

      return topPosts;
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
      throw new NotFoundException(error.message);
    }
  }

  @Delete('delete')
  async deletePost(@Body() body: { post_id: string; user_id: string }) {
    const { post_id, user_id } = body;
    return await this.postService.deletePost(post_id, user_id);
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

  @Get('/category/:category_id')
  async getPostsByCategory(@Param('category_id') category_id: number) {
    return this.postService.getPostByCategory(category_id);
  }
}
