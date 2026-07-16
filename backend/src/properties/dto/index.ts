import { IsString, IsOptional, IsObject, IsBoolean, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  databaseId: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsObject()
  config?: any;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  config?: any;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}
