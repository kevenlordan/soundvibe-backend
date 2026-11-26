import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  date_joined: Date;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}