import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AlbumModel } from './album/album.model';
import { ArtistModel } from './artist/artist.model';
import { FavoritesModel } from './favorites/favorites.model';
import { TrackModel } from './track/track.model';
import { UserModel } from './user/user.model';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserModel, ArtistModel, AlbumModel, TrackModel, FavoritesModel],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
});
