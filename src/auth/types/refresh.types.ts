import { IsJWT, IsOptional } from 'class-validator';

export class RefreshDto {
  @IsJWT()
  @IsOptional()
  refreshToken?: string;
}
