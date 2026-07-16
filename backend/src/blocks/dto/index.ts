import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  pageId: string;

  @IsString()
  type: string;

  @IsObject()
  content: any;

  @IsNumber()
  order: number;
}

export class UpdateBlockDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsObject()
  content?: any;

  @IsOptional()
  @IsNumber()
  order?: number;
}
