import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/post.entity';
import { PostView } from 'src/typeorm/entities/post-view.entity';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { Bookmark } from 'src/typeorm/entities/bookmark.entity';
import { Share } from 'src/typeorm/entities/share.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostView, Comment, Bookmark, Share]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
