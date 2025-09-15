import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // quita propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // lanza error si hay props extras
    transform: true,       // convierte strings a números, fechas, etc.
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
