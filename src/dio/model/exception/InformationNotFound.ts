import { HttpException, HttpStatus} from '@nestjs/common';
export class InformationNotFound extends HttpException {
    constructor() {
      super('Informação não encontrada', HttpStatus.NOT_FOUND);
    }
  }