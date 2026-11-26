import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('podcasts')
export class Podcast {
  @PrimaryGeneratedColumn()
  podcast_id: number;

  @Column()
  title: string;

  @Column()
  host: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}