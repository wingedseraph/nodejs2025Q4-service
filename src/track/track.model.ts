import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumModel } from '../album/album.model';
import { ArtistModel } from '../artist/artist.model';

@Entity('track')
export class TrackModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;

  @ManyToOne(() => ArtistModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistModel | null;
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => AlbumModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: AlbumModel | null;
  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column({ type: 'integer' })
  duration: number; // integer number
}
