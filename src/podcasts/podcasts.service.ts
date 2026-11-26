import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Podcast } from './entities/podcast.entity';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private podcastsRepo: Repository<Podcast>,
  ) {}

  create(dto: CreatePodcastDto) {
    const podcast = this.podcastsRepo.create(dto);
    return this.podcastsRepo.save(podcast);
  }

  findAll() {
    return this.podcastsRepo.find();
  }

  async findOne(id: number) {
    const podcast = await this.podcastsRepo.findOne({ where: { podcast_id: id } });
    if (!podcast) throw new NotFoundException(`Podcast #${id} not found`);
    return podcast;
  }

  async update(id: number, dto: UpdatePodcastDto) {
    const podcast = await this.findOne(id);
    Object.assign(podcast, dto);
    return this.podcastsRepo.save(podcast);
  }

  async remove(id: number) {
    const podcast = await this.findOne(id);
    await this.podcastsRepo.remove(podcast);
    return { deleted: true, podcast_id: id };
  }
}