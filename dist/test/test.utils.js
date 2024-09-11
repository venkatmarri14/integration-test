"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUtils = void 0;
const fs = require("fs");
const Path = require("path");
const database_service_1 = require("../database/database.service");
const common_1 = require("@nestjs/common");
let TestUtils = class TestUtils {
    constructor(databaseService) {
        if (process.env.NODE_ENV !== "test") {
            throw new Error("ERROR-TEST-UTILS-ONLY-FOR-TESTS");
        }
        this.databaseService = databaseService;
    }
    async shutdownServer(server) {
        await server.httpServer.close();
        await this.closeDbConnection();
    }
    async closeDbConnection() {
        const connection = await this.databaseService.connection;
        if (connection.isConnected) {
            await (await this.databaseService.connection).close();
        }
    }
    getOrder(entityName) {
        const order = JSON.parse(fs.readFileSync(Path.join(__dirname, "../test/fixtures/_order.json"), "utf8"));
        return order.indexOf(entityName);
    }
    async getEntities() {
        const entities = [];
        (await (await this.databaseService.connection).entityMetadatas).forEach(x => entities.push({ name: x.name, tableName: x.tableName, order: this.getOrder(x.name) }));
        return entities;
    }
    async reloadFixtures() {
        const entities = await this.getEntities();
        await this.cleanAll(entities);
        await this.loadAll(entities);
    }
    async cleanAll(entities) {
        try {
            for (const entity of entities.sort((a, b) => b.order - a.order)) {
                const repository = await this.databaseService.getRepository(entity.name);
                await repository.query(`DELETE FROM ${entity.tableName};`);
                await repository.query(`DELETE FROM sqlite_sequence WHERE name='${entity.tableName}'`);
            }
        }
        catch (error) {
            throw new Error(`ERROR: Cleaning test db: ${error}`);
        }
    }
    async loadAll(entities) {
        try {
            for (const entity of entities.sort((a, b) => a.order - b.order)) {
                const repository = await this.databaseService.getRepository(entity.name);
                const fixtureFile = Path.join(__dirname, `../test/fixtures/${entity.name}.json`);
                if (fs.existsSync(fixtureFile)) {
                    const items = JSON.parse(fs.readFileSync(fixtureFile, "utf8"));
                    const result = await repository
                        .createQueryBuilder(entity.name)
                        .insert()
                        .values(items)
                        .execute();
                }
            }
        }
        catch (error) {
            throw new Error(`ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`);
        }
    }
};
exports.TestUtils = TestUtils;
exports.TestUtils = TestUtils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TestUtils);
//# sourceMappingURL=test.utils.js.map