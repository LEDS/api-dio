import { Controller, HttpService, Get, HttpCode } from '@nestjs/common';

import { NewsService } from 'news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly httpService: HttpService,private newsService: NewsService) {}
  @Get()
  @HttpCode(200)
  async pega() {
    return this.newsService.paginas(3)
  }
}
