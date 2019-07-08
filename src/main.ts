import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);
  const host = configService.get<string>('host');
  const port = configService.get<number>('port');

  const options = new DocumentBuilder()
    .setTitle('Skeleton App Backend')
    .setDescription('The backend for the Skeleton App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, host, () => logger.log(`Backend listening at ${host}:${port}`));
}
bootstrap();
