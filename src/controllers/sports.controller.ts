import type {Request, Response} from "express";
import {pool} from "../db/connection.js";

export async function getAllSports(req: Request, res: Response) {
    console.log('getsports.');

    const query = 'SELECT * FROM sports';
    try {
        const [result] = await pool.query(query);
        console.log('gotsports', result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}
