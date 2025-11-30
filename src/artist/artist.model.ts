import { randomUUID } from 'node:crypto';

export class ArtistModel {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = randomUUID();
    this.name = name;
    this.grammy = grammy;
  }
}
