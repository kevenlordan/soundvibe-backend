import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  playlist_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}
