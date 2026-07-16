import { IsString, IsOptional } from 'class-validator';

export class CreatePageShareDto {
  @IsString()
  pageId: string;

  @IsOptional()
  @IsString()
  sharedWithUserId?: string;

  @IsOptional()
  @IsString()
  sharedWithEmail?: string;

  @IsString()
  permission: string;

  @IsOptional()
  expiresAt?: Date;
}
