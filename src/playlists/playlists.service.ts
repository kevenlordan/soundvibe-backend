import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistsRepo: Repository<Playlist>,
  ) {}

  create(dto: CreatePlaylistDto) {
    const playlist = this.playlistsRepo.create(dto);
    return this.playlistsRepo.save(playlist);
  }

  findAll() {
    return this.playlistsRepo.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    const playlist = await this.playlistsRepo.findOne({
      where: { playlist_id: id },
      relations: { user: true },
    });
    if (!playlist) throw new NotFoundException(`Playlist #${id} not found`);
    return playlist;
  }

  async update(id: number, dto: UpdatePlaylistDto) {
    const playlist = await this.findOne(id);
    Object.assign(playlist, dto);
    return this.playlistsRepo.save(playlist);
  }

  async remove(id: number) {
    const playlist = await this.findOne(id);
    await this.playlistsRepo.remove(playlist);
    return { deleted: true, playlist_id: id };
  }
}