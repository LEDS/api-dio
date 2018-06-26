export class Noticia {
    titulo: string;
    conteudo: string;
    data: string;

    constructor(titulo: string, conteudo: string, data: string){
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.data = data;
    }
}