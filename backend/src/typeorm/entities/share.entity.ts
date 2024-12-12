import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('shares')
@Index('fk_shares_posts', ['post_id'])
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  flatform: string;

  @Column({ type: 'varchar', length: 45 })
  post_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @ManyToOne(() => Post, (post) => post.shares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
