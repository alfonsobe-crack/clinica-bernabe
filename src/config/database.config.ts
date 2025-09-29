import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432',10) || 5432,
    username: process.env.DB_USERNAME || 'clinicadb_user',
    password: process.env.DB_PASSWORD ,
    database: process.env.BD_NAME || 'clinicadb',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development'
}))