import {
  IsString,
  IsOptional,
  IsInt,
  MaxLength,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  category_id: number;

  @IsInt()
  @IsOptional()
  views?: number;
}
