import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Bookmark } from './bookmark.entity';
import { CommentLike } from './comment-like.entity';
import { CommentDislike } from './comment-dislike.entity';

@Entity('users')
@Unique(['google_id'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  google_id: string;

  @Column({ type: 'varchar', length: 45 })
  familyName: string;

  @Column({ type: 'varchar', length: 45 })
  givenName: string;

  @Column({ type: 'varchar', length: 511, nullable: true })
  avatar_url: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @Column({ type: 'varchar', length: 45 })
  @Index()
  email: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user, { cascade: true })
  bookmarks: Bookmark[];

  @OneToMany(() => CommentLike, (like) => like.user, { cascade: true })
  likes: CommentLike[];

  @OneToMany(() => CommentDislike, (dislike) => dislike.user, { cascade: true })
  dislikes: CommentDislike[];

  @Column({ nullable: true })
  hashedRefreshToken: string | null;
}
