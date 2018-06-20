import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}
}
