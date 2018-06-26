export class DiarioOficial {
    url: string;
    date: string;
    description: string;

    constructor(url: string, date: string, description: string){
        this.url = url;
        this.date = date;
        this.description = description;
    }
}