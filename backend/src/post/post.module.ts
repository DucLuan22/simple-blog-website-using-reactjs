import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from 'src/typeorm/entities/post.entity';
import { PostView } from 'src/typeorm/entities/post-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostView])],
  controllers: [PostController],
  providers: [PostService],
  exports: [TypeOrmModule],
})
export class PostModule {}
