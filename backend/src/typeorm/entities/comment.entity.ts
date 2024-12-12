import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
@Index('comments_ibfk_1', ['user_id'])
@Index('comments_ibfk_2', ['post_id'])
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'char', length: 36, nullable: false })
  post_id: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @Column({ type: 'int', default: 0 })
  dislikes: number;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
