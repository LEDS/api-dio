import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class SearchService {
    constructor(private readonly httpService: HttpService) {}
    async get(query){
        console.log(query)
        const pagina = await this.httpService
        .get('http://ioes.dio.es.gov.br/busca#/p=1&q='+query+'&f=true')
        .toPromise();
        return pagina.data
    }
}
