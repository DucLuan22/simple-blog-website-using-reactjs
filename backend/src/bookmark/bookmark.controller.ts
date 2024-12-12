import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post('toggle')
  async toggleBookmark(
    @Body('user_id') user_id: number,
    @Body('post_id') post_id: string,
  ) {
    return this.bookmarkService.toggleBookmark(user_id, post_id);
  }

  @Get('user/:user_id')
  async getBookmarksByUserId(@Param('user_id') user_id: number) {
    return this.bookmarkService.getBookmarksByUserId(user_id);
  }

  @Delete('delete')
  async deleteBookmark(
    @Body('user_id') user_id: number,
    @Body('post_id') post_id: string,
  ) {
    return this.bookmarkService.deleteBookmark(user_id, post_id);
  }
}
