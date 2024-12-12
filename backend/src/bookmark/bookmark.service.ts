import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/typeorm/entities/bookmark.entity';
import { Post } from 'src/typeorm/entities/post.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async toggleBookmark(user_id: number, post_id: string): Promise<any> {
    const existingBookmark = await this.bookmarkRepository.findOne({
      where: { user_id, post_id },
    });

    if (existingBookmark) {
      await this.bookmarkRepository.delete({ user_id, post_id });
      return { success: true, message: 'Bookmark removed successfully' };
    } else {
      const newBookmark = this.bookmarkRepository.create({ user_id, post_id });
      await this.bookmarkRepository.save(newBookmark);
      return {
        success: true,
        message: 'Bookmark added successfully',
        data: { user_id, post_id },
      };
    }
  }

  async getBookmarksByUserId(user_id: number): Promise<any> {
    const bookmarks = await this.bookmarkRepository
      .createQueryBuilder('bookmarks')
      .leftJoinAndSelect('bookmarks.post', 'post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'bookmarks.user_id AS "user_id"',
        'bookmarks.post_id AS "post_id"',
        'post.title AS "title"',
        'post.content AS "content"',
        'post.thumbnail AS "thumbnail"',
        'post.views AS "views"',
        'user.familyName AS "familyName"',
        'user.givenName AS "givenName"',
      ])
      .where('bookmarks.user_id = :user_id', { user_id })
      .getRawMany();

    return bookmarks;
  }

  async deleteBookmark(user_id: number, post_id: string): Promise<any> {
    const result = await this.bookmarkRepository.delete({ user_id, post_id });

    if (result.affected === 0) {
      throw new NotFoundException('Bookmark not found');
    }

    return { success: true, message: 'Bookmark deleted successfully' };
  }
}
