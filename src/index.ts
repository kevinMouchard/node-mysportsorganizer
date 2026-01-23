import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import coursesRoutes from './routes/courses.routes.js';
import sportsRoutes from './routes/sports.routes.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from "./routes/users.routes.js";
import cookieParser from "cookie-parser";

console.log('FRONTEND_ORIGIN:', process.env.FRONTEND_ORIGIN);

const app = express();        // Create an instance of the express application
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN!,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/courses', coursesRoutes);
app.use('/sports', sportsRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Start the server on port 3000
const port = parseInt(process.env.PORT || '3000', 10);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

