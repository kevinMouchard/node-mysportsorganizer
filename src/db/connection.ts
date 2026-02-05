import mysqlPromises from 'mysql2/promise'; // note /promise
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysqlPromises.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mysql',
    database: process.env.DB_NAME || 'mysportsorganizer',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
