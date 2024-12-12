import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { CommentDislike } from 'src/typeorm/entities/comment-dislike.entity';
import { CommentLike } from 'src/typeorm/entities/comment-like.entity';
import { User } from 'src/typeorm/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, CommentDislike, CommentLike, User]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
