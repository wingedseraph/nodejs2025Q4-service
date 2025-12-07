import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistModel } from '../artist/artist.model';

@Entity('album')
export class AlbumModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column({ type: 'integer' })
  year: number;

  @ManyToOne(() => ArtistModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistModel | null;
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist
}
