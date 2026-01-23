// import mysql, {type Connection } from 'mysql2';
import mysqlPromises from 'mysql2/promise'; // note /promise
import dotenv from 'dotenv';

dotenv.config();

// export const connection: Connection = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || 'mysql',
//     database: process.env.DB_NAME || 'mysportsorganizer',
// });

export const pool = mysqlPromises.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mysql',
    database: process.env.DB_NAME || 'mysportsorganizer',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// connection.connect((err) => {
//     if (err) {
//         console.error('MySQL connection error:', err);
//         process.exit(1); // stop app if DB not connected
//     }
//     console.log('Connected to MySQL database.');
// });
