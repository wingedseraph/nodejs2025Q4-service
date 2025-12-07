import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumModel } from '../album/album.model';
import { ArtistModel } from '../artist/artist.model';
import { TrackModel } from '../track/track.model';

@Entity('favorites')
export class FavoritesModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistModel, { eager: true })
  @JoinTable({
    name: 'favorite_artists',
    joinColumn: { name: 'favorites_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'id' },
  })
  artists: ArtistModel[];

  @ManyToMany(() => AlbumModel, { eager: true })
  @JoinTable({
    name: 'favorite_albums',
    joinColumn: { name: 'favorites_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'album_id', referencedColumnName: 'id' },
  })
  albums: AlbumModel[];

  @ManyToMany(() => TrackModel, { eager: true })
  @JoinTable({
    name: 'favorite_tracks',
    joinColumn: { name: 'favorites_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'track_id', referencedColumnName: 'id' },
  })
  tracks: TrackModel[];
}
