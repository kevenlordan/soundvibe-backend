import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Track } from '../../tracks/entities/track.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  artist_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
