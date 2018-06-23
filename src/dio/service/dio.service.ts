import { Injectable, HttpService } from '@nestjs/common';
import { DiarioOficial } from '../model/dto/diariooficial';
import { Noticia } from '../model/dto/noticia';

@Injectable()
export class DioService {

    private url_api = 'http://ioes.dio.es.gov.br/apifront/portal/edicoes/ultimas_edicoes/';
    private url_edicao = 'http://ioes.dio.es.gov.br/portal/edicoes/download/';
    private url_noticias = 'http://dio.es.gov.br/Noticias?page=1';
    private url_busca = 'http://ioes.dio.es.gov.br/busca#/p=1&q=';

    constructor(private readonly httpService: HttpService){}

    async retornar_ultirmos_diarios(){

        const pagina = await this.buscar_informacao(this.url_api);

        const diarios = [];

        pagina.data.itens.forEach(element => {

            const diario = new DiarioOficial();

            diario.date = element.data;
            diario.description = element.tipo_edicao_nome;
            diario.url = this.url_edicao + element.id;

            diarios.push(diario);
        });
        if (diarios.length > 0) {
            return diarios;
        }
        throw new Error('Error');
    }
    async retornar_noticias(){

        const pagina = await this.buscar_informacao(this.url_noticias);

        const $ = cheerio.load(pagina.data);
        const noticias = [];

        const titulos = $('a.link-color-color');
        const textos = $('.noticia .text-color-color.text-family-font-family');
        const datas = $('div .text-color-color.text-family-font-family.published ');

        const titulo = [];
        const texto = [];
        const data = [];

        datas.toArray().forEach(element => {
            const div = element.firstChild.data.trimLeft().trimRight();
            data.push(div);
        });

        titulos.toArray().forEach(element => {
            const title = element.attribs.title;
            if ( title.length > 50 ){
                titulo.push(title);
            }
        });
        textos.text().split('\n').forEach(element => {

            if (element.length > 150) {
                texto.push(element.substring(16).substring(0, element.length - 26));
            }
        });

        for (let index = 0; index < texto.length; index++) {
            const etexto = texto[index];
            const etitulo = titulo[index];
            const edata = data[index];

            const noticia = new Noticia();
            noticia.titulo = etitulo;
            noticia.conteudo = etexto;
            noticia.data = edata;
            noticias.push(noticia);
        }
        if (noticias.length > 0) {
            return noticias;
        }
        throw new Error('Error');
    }
    async buscar_diarios(query: string ){

        const pagina = await this.buscar_informacao(this.url_busca + query + '&f=true');

        return pagina.data;
    }

    /** Função responsável por buscar informações no site do DIO */
    private async buscar_informacao(url: string){
        return this.httpService.get(url).toPromise();
    }
}
