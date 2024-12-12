import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ShareService } from './share.service';
import { CreateShareDto } from './dto/create-share.dto';
import { Share } from 'src/typeorm/entities/share.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Public()
  @Post()
  async createShare(
    @Body() createShareDto: CreateShareDto,
  ): Promise<{ success: boolean; message: string; data: Share }> {
    try {
      const createdShare = await this.shareService.createShare(createShareDto);
      return {
        success: true,
        message: 'Share created successfully',
        data: createdShare,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: error.message || 'An error occurred while creating the share',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
