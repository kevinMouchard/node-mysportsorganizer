import { Router } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import {getUserByEmail} from "../controllers/users.controller.js";
const router = Router();

// const app = express();
router.use(cookieParser());

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user in DB
    const user = await getUserByEmail(email);
    // const user = {id: 0, email: '', password_hash: ''}
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log(' Check password');
    // 2. Check password
    const valid = await bcrypt.compare(password, user.PASSWORD_HASH);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log(' Checked');
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    // 3. Create JWT
    const token = jwt.sign(
        { id: user.ID, email: user.EMAIL },
        secret,
        { expiresIn: '1h' }
    );

    // 4. Send JWT in HttpOnly cookie
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,      // HTTPS only (required in prod)
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });

    res.json(user);
});

router.post('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.json({ message: 'Logged out' });
});

export default router;
