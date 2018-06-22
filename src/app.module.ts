import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsService } from './news.service';
import { NewsController } from './news/news.controller';
import { LatestController } from './latest/latest.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, NewsController, LatestController],
  providers: [AppService, NewsService],
})
export class AppModule {}
