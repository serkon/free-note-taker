import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateDatabaseRecordDto {
  @IsString()
  databaseId: string;

  @IsObject()
  values: any;
}

export class UpdateDatabaseRecordDto {
  @IsOptional()
  @IsObject()
  values?: any;
}
