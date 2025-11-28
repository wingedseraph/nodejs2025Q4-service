import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import * as YAML from 'yamljs';
import { AppModule } from './app.module';

const PORT = Number(process.env.PORT) || 4000;
const SWAGGER_FILE = `${process.cwd()}/doc/api.yaml` as const;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = YAML.load(SWAGGER_FILE);
  SwaggerModule.setup('api', app, config);

  await app.listen(PORT);
}
bootstrap();
