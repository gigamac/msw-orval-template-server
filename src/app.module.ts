import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { PetsController } from './pets.controller';
import { OwnersController } from './owners.controller';
import { AdoptController } from './adopt.controller';
import { HealthController } from './health.controller';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  controllers: [PetsController, OwnersController, AdoptController, HealthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}