import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
import { Comment } from './typeorm/entities/comment.entity';

import { Category } from './typeorm/entities/category.entity';
import { Bookmark } from './typeorm/entities/bookmark.entity';
import { Share } from './typeorm/entities/share.entity';
import { PostView } from './typeorm/entities/post-view.entity';
import { CommentLike } from './typeorm/entities/comment-like.entity';
import { CommentDislike } from './typeorm/entities/comment-dislike.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { Post } from './typeorm/entities/post.entity';
import { CommentModule } from './comment/comment.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ShareModule } from './share/share.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_CONNECTION,
      port: 3306,
      username: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'blog',
      entities: [
        User,
        Category,
        Post,
        Comment,
        Bookmark,
        Share,
        PostView,
        CommentLike,
        CommentDislike,
      ],
      synchronize: true,
      logging: false,
    }),
    UserModule,
    PostModule,
    CategoryModule,
    CommentModule,
    BookmarkModule,
    ShareModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
