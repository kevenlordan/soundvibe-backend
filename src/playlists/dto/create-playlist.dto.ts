import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}