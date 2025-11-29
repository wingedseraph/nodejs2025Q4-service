import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Album {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
