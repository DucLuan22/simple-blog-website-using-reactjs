import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/comment.entity';
import { CommentDislike } from 'src/typeorm/entities/comment-dislike.entity';
import { CommentLike } from 'src/typeorm/entities/comment-like.entity';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(CommentLike)
    private readonly commentLikeRepository: Repository<CommentLike>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CommentDislike)
    private readonly commentDislikeRepository: Repository<CommentDislike>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create(createCommentDto);
    return await this.commentRepository.save(newComment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({ relations: ['user', 'post'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { comment_id: id },
      relations: ['user', 'post'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number, user_id: number): Promise<string> {
    const comment = await this.commentRepository.findOne({
      where: { comment_id: id, user_id },
    });

    if (!comment) {
      throw new NotFoundException(
        `Comment with ID ${id} not found or does not belong to the user with ID ${user_id}`,
      );
    }

    await this.commentRepository.remove(comment);
    return `Comment with ID ${id} successfully deleted`;
  }

  async getCommentsByPostId(post_id: string) {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.post_id = :post_id', { post_id })
      .getMany();

    return Promise.all(
      comments.map(async (comment) => {
        const likeCount = await this.commentLikeRepository.count({
          where: { comment_id: comment.comment_id },
        });

        const dislikeCount = await this.commentDislikeRepository.count({
          where: { comment_id: comment.comment_id },
        });

        return {
          comment_id: comment.comment_id,
          user_id: comment.user_id,
          post_id: comment.post_id,
          content: comment.content,
          createdAt: comment.createdAt,
          givenName: comment.user.givenName,
          familyName: comment.user.familyName,
          likes: likeCount,
          dislikes: dislikeCount,
        };
      }),
    );
  }

  async toggleLikeComment(
    user_id: number,
    comment_id: number,
  ): Promise<string> {
    const existingLike = await this.commentLikeRepository.findOne({
      where: { user_id, comment_id },
    });

    const comment = await this.commentRepository.findOne({
      where: { comment_id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${comment_id} not found`);
    }

    if (existingLike) {
      await this.commentLikeRepository.delete({ user_id, comment_id });
      comment.likes = Math.max(0, comment.likes - 1);
      await this.commentRepository.save(comment);

      return 'Removed like';
    } else {
      const newLike = this.commentLikeRepository.create({
        user_id,
        comment_id,
      });
      await this.commentLikeRepository.save(newLike);
      comment.likes += 1;
      await this.commentRepository.save(comment);

      return 'Comment liked successfully';
    }
  }

  async toggleDislikeComment(
    user_id: number,
    comment_id: number,
  ): Promise<string> {
    const existingDislike = await this.commentDislikeRepository.findOne({
      where: { user_id, comment_id },
    });

    const comment = await this.commentRepository.findOne({
      where: { comment_id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${comment_id} not found`);
    }

    if (existingDislike) {
      // User already disliked the comment, remove the dislike
      await this.commentDislikeRepository.delete({ user_id, comment_id });
      comment.dislikes = Math.max(0, comment.dislikes - 1); // Ensure dislikes don't go negative
      await this.commentRepository.save(comment);

      return 'Removed dislike';
    } else {
      // User has not disliked the comment yet, add a dislike
      const newDislike = this.commentDislikeRepository.create({
        user_id,
        comment_id,
      });
      await this.commentDislikeRepository.save(newDislike);
      comment.dislikes += 1;
      await this.commentRepository.save(comment);

      return 'Comment disliked successfully';
    }
  }
}
