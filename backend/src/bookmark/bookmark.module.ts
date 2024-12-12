import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from 'src/typeorm/entities/bookmark.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { Post } from 'src/typeorm/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, User, Post])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
