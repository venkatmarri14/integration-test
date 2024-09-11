/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';

describe('TestingModule', () => {
    let testingModule: TestingModule;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [],   // Add
        }).compile();

        testingModule = moduleRef.get<TestingModule>(TestingModule);
    });

    it('should be defined', () => {
        expect(testingModule).toBeDefined();
    });
});
