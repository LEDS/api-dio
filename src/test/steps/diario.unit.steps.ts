import { Test, TestingModule } from '@nestjs/testing';
import { DioService } from '../../dio/service/dio.service';

import { Given, Before } from 'cucumber';

let module: TestingModule;
let dioService: DioService;

// tslint:disable-next-line:only-arrow-functions
Before(async function() {
    module = await Test.createTestingModule({
        providers: [DioService],
    }).compile();
});
// tslint:disable-next-line:only-arrow-functions
Given('Eu sou um usuário', function() {
        dioService = module.get<DioService>(DioService);
        expect(dioService).toBeDefined();
});