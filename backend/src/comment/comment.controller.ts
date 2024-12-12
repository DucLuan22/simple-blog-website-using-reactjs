import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Public()
  @Get('post/:post_id')
  findCommentByPostId(@Param('post_id') post_id: string) {
    return this.commentService.getCommentsByPostId(post_id);
  }

  @Delete('delete')
  async remove(
    @Body('comment_id') comment_id: number,
    @Body('user_id') user_id: number,
  ): Promise<string> {
    return this.commentService.remove(comment_id, user_id);
  }

  @Patch('like')
  async toggleLike(
    @Body('user_id') user_id: number,
    @Body('comment_id') comment_id: number,
  ) {
    return this.commentService.toggleLikeComment(user_id, comment_id);
  }

  @Patch('dislike')
  async toggleDislike(
    @Body('user_id') user_id: number,
    @Body('comment_id') comment_id: number,
  ) {
    return this.commentService.toggleDislikeComment(user_id, comment_id);
  }
}
