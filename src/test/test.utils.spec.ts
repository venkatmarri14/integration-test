/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';

describe('TestUtils', () => {
    let testUtils: TestUtils;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [],   // Add
        }).compile();

        testUtils = moduleRef.get<TestUtils>(TestUtils);
    });

    it('should be defined', () => {
        expect(testUtils).toBeDefined();
    });
});
