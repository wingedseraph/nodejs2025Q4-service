import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column({ type: 'integer' })
  year: number;
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist
}
