import { IsString, IsOptional } from 'class-validator';

export class CreateDatabaseDto {
  @IsString()
  pageId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateDatabaseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
