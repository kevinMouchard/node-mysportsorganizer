import type {User} from "../model/user.model.js";
import type {ResultSetHeader, RowDataPacket} from 'mysql2';
import { pool } from '../db/connection.js';
import type {Request, Response} from "express";
import {format} from "date-fns";
import {hashPassword} from "../utils/encoding.utils.js";

export async function getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (rows.length === 0) {
        return null; // ✅ now matches Promise<User | null>
    }

    const row = rows[0] as User;

    return row; // ✅ every code path returns a value
}


export async function addUser(req: Request, res: Response) {
    const u = req.body;

    const hashedPAssword = await hashPassword(u.PASSWORD_HASH);

    if (!hashedPAssword) {
        res.status(500).json({ error: 'Password error' });
        return;
    }

    const query = 'insert into users (NOM, PRENOM, DDN, EMAIL, PASSWORD_HASH)'
        + 'VALUES (?, ?, ?, ?, ?);'
    const values = [u.NOM, u.PRENOM, format(u.DDN, 'yyyy-MM-dd'), u.EMAIL, hashedPAssword];
    try {
        const [result] = await pool.query<ResultSetHeader>(query, values);
        const userCreated = {
            ID: result.insertId,
            NOM: u.NOM,
            PRENOM: u.PRENOM,
            EMAIL: u.EMAIL,
            PASSWORD_HASH: u.PASSWORD_HASH
        }
        res.json(userCreated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}
