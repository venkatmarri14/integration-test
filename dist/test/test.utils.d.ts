import { DatabaseService } from "../database/database.service";
export declare class TestUtils {
    databaseService: DatabaseService;
    constructor(databaseService: DatabaseService);
    shutdownServer(server: any): Promise<void>;
    closeDbConnection(): Promise<void>;
    getOrder(entityName: any): number;
    getEntities(): Promise<any[]>;
    reloadFixtures(): Promise<void>;
    cleanAll(entities: any): Promise<void>;
    loadAll(entities: any[]): Promise<void>;
}
