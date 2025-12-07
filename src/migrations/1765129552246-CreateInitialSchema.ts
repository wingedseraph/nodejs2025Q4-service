import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1765129552246 implements MigrationInterface {
    name = 'CreateInitialSchema1765129552246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_artists" ("favorites_id" uuid NOT NULL, "artist_id" uuid NOT NULL, CONSTRAINT "PK_fdc25184f471ccff00a21bc26f2" PRIMARY KEY ("favorites_id", "artist_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b6f61b387f50ea90ea09cb70fa" ON "favorite_artists" ("favorites_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_177889f5d1b6f1280a54ba9226" ON "favorite_artists" ("artist_id") `);
        await queryRunner.query(`CREATE TABLE "favorite_albums" ("favorites_id" uuid NOT NULL, "album_id" uuid NOT NULL, CONSTRAINT "PK_72c8e822c75388f62c9017ff4a8" PRIMARY KEY ("favorites_id", "album_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23eaa41739988db885529ea1a2" ON "favorite_albums" ("favorites_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_42e02a136b78c65e0b89b7c8d9" ON "favorite_albums" ("album_id") `);
        await queryRunner.query(`CREATE TABLE "favorite_tracks" ("favorites_id" uuid NOT NULL, "track_id" uuid NOT NULL, CONSTRAINT "PK_2e0096e3a5622ee7fa0ff504a9a" PRIMARY KEY ("favorites_id", "track_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d71c0f7cc90c45ebb57227fe4" ON "favorite_tracks" ("favorites_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_23ba6f9c49589a631f5adb662e" ON "favorite_tracks" ("track_id") `);
        await queryRunner.query(`ALTER TABLE "favorite_artists" ADD CONSTRAINT "FK_b6f61b387f50ea90ea09cb70fa8" FOREIGN KEY ("favorites_id") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_artists" ADD CONSTRAINT "FK_177889f5d1b6f1280a54ba9226b" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_albums" ADD CONSTRAINT "FK_23eaa41739988db885529ea1a27" FOREIGN KEY ("favorites_id") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_albums" ADD CONSTRAINT "FK_42e02a136b78c65e0b89b7c8d96" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks" ADD CONSTRAINT "FK_7d71c0f7cc90c45ebb57227fe4e" FOREIGN KEY ("favorites_id") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks" ADD CONSTRAINT "FK_23ba6f9c49589a631f5adb662e5" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_tracks" DROP CONSTRAINT "FK_23ba6f9c49589a631f5adb662e5"`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks" DROP CONSTRAINT "FK_7d71c0f7cc90c45ebb57227fe4e"`);
        await queryRunner.query(`ALTER TABLE "favorite_albums" DROP CONSTRAINT "FK_42e02a136b78c65e0b89b7c8d96"`);
        await queryRunner.query(`ALTER TABLE "favorite_albums" DROP CONSTRAINT "FK_23eaa41739988db885529ea1a27"`);
        await queryRunner.query(`ALTER TABLE "favorite_artists" DROP CONSTRAINT "FK_177889f5d1b6f1280a54ba9226b"`);
        await queryRunner.query(`ALTER TABLE "favorite_artists" DROP CONSTRAINT "FK_b6f61b387f50ea90ea09cb70fa8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23ba6f9c49589a631f5adb662e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d71c0f7cc90c45ebb57227fe4"`);
        await queryRunner.query(`DROP TABLE "favorite_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42e02a136b78c65e0b89b7c8d9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23eaa41739988db885529ea1a2"`);
        await queryRunner.query(`DROP TABLE "favorite_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_177889f5d1b6f1280a54ba9226"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b6f61b387f50ea90ea09cb70fa"`);
        await queryRunner.query(`DROP TABLE "favorite_artists"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
