import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Bookmark } from './bookmark.entity';
import { Share } from './share.entity';
import { PostView } from './post-view.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'longtext', nullable: true })
  thumbnail: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Index()
  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @ManyToOne(() => Category, (category) => category.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Date;

  @Column({ type: 'int', default: 0 })
  views: number;

  @OneToMany(() => PostView, (postView) => postView.post)
  viewsDetails: PostView[];

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.post, { cascade: true })
  bookmarks: Bookmark[];

  @OneToMany(() => Share, (share) => share.post, { cascade: true })
  shares: Share[];

  @OneToMany(() => PostView, (postView) => postView.post)
  postViews: PostView[];
}
