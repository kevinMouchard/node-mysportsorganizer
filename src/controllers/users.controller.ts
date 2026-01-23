import type {User} from "../model/user.model.js";
import type {RowDataPacket} from 'mysql2';
import { pool } from '../db/connection.js';
import type {Request, Response} from "express";
import {format} from "date-fns";
import {hashPassword} from "../utils/encoding.utils.js";

export async function getUserByEmail(email: string): Promise<User | null> {
    console.log('getting user')
    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (rows.length === 0) {
        return null; // ✅ now matches Promise<User | null>
    }

    const row = rows[0] as User;
    console.log(row);

    // const user: User = {
    //     id: row?.ID,
    //     nom: row?.NOM,
    //     prenom: row?.PRENOM,
    //     ddn: row?.DDN,
    //     email: row?.EMAIL,
    //     password_hash: row?.PASSWORD_HASH
    // };

    return row; // ✅ every code path returns a value
}


export async function addUser(req: Request, res: Response) {
    const u = req.body;
    console.log('adding user', u.nom);

    const hashedPAssword = await hashPassword(u.PASSWORD_HASH);

    if (!hashedPAssword) {
        res.status(500).json({ error: 'Password error' });
        return;
    }

    const query = 'insert into users (NOM, PRENOM, DDN, EMAIL, PASSWORD_HASH)'
        + ' VALUES (' + '"' + u.NOM + '"' + ', ' + '"' + u.PRENOM + '"' + ', ' + '"' + format(u.DDN, 'yyyy-MM-dd') + '"' + ', ' + '"' + u.EMAIL + '"' + ', ' + '"' + hashedPAssword + '"' + ')';
    try {
        const [result] = await pool.query(query, u);
        console.log('addedCourse', result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}
