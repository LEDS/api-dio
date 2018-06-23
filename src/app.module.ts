import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DioController } from './dio/controller/dio.controller';
import { DioService } from './dio/service/dio.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, DioController],
  providers: [AppService, DioService],
})
export class AppModule {}
