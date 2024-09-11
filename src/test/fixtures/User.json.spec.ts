/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';

describe('UserJson', () => {
    let userJson: UserJson;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [],   // Add
        }).compile();

        userJson = moduleRef.get<UserJson>(UserJson);
    });

    it('should be defined', () => {
        expect(userJson).toBeDefined();
    });
});
