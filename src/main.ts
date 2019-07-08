import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);
  const host = configService.get<string>('host');
  const port = configService.get<number>('port');

  await app.listen(port, host, () => logger.log(`Backend listening at ${host}:${port}`));
}
bootstrap();
