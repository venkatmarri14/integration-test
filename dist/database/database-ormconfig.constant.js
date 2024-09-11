"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrmConfig = void 0;
const user_entity_1 = require("../user/user.entity");
const teacher_entity_1 = require("../user/teacher.entity");
const teacher_user_entity_1 = require("../user/teacher-user.entity");
function getOrmConfig() {
    let OrmConfig;
    const settings = {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
    };
    if (process.env.NODE_ENV !== 'test') {
        OrmConfig = {
            type: 'postgres',
            host: settings.host,
            port: settings.port,
            username: settings.username,
            password: settings.username,
            database: settings.database,
            entities: [user_entity_1.User, teacher_entity_1.Teacher, teacher_user_entity_1.TeacherUser],
            synchronize: true
        };
    }
    else {
        OrmConfig = {
            type: 'sqlite',
            database: './db/test-db.sql',
            entities: [user_entity_1.User, teacher_entity_1.Teacher, teacher_user_entity_1.TeacherUser],
            synchronize: true,
            dropSchema: true
        };
    }
    return OrmConfig;
}
exports.getOrmConfig = getOrmConfig;
//# sourceMappingURL=database-ormconfig.constant.js.map