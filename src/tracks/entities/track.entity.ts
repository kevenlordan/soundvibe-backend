import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn()
  track_id: number;

  @Column()
  artist_id: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @Column()
  title: string;

  @Column({ nullable: true })
  album: string;

  @Column({ nullable: true })
  genre: string;

  @Column()
  duration_sec: number;

  @Column({ type: 'date', nullable: true })
  release_date: string;
}