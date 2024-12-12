import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number; // ID of the user who created the comment

  @IsString()
  @IsNotEmpty()
  post_id: string; // ID of the post the comment belongs to

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  content?: string; // Optional content of the comment
}
