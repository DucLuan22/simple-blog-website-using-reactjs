import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Share } from 'src/typeorm/entities/share.entity';
import { Repository } from 'typeorm';
import { CreateShareDto } from './dto/create-share.dto';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private readonly shareRepository: Repository<Share>,
  ) {}

  async createShare(createShareDto: CreateShareDto): Promise<Share> {
    const share = this.shareRepository.create({
      ...createShareDto,
      createdDate: new Date(),
    });
    return this.shareRepository.save(share);
  }
}
