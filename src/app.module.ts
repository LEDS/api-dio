import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/news.controller';
import { LatestController } from './latest/latest.controller';
import { LatestService } from './latest/latest.service';
import { NewsService } from './news/news.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, NewsController, LatestController],
  providers: [AppService, NewsService, LatestService],
})
export class AppModule {}
