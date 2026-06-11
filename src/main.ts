import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so your React frontend on localhost:3000 can talk to this API
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Swagger Petstore (Relational Stateful Template)')
    .setVersion('1.0.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);

  Logger.log(`Health check: http://localhost:3001/health`, 'Bootstrap');
  Logger.log(`Swagger UI (Docs): http://localhost:3001/api`, 'Bootstrap');
  Logger.log(`OpenAPI JSON: http://localhost:3001/api-json`, 'Bootstrap');
}
bootstrap();