import {pool} from "../db/connection.js";
import type {Request, Response} from 'express';
import {format} from "date-fns";
import type {Course} from "../model/course.model";
import type {ResultSetHeader} from "mysql2";

export async function getAllCoursesBySportId(req: Request, res: Response) {
    if (req.params.sportId) {
        const sportId = parseInt(req.params.sportId as string, 10);
        const userId = req?.user?.id as number;
        const query = 'SELECT * FROM courses where SPORT_ID = ? and USER_ID = ?';
        const values = [sportId, userId];
        try {
            const [result] = await pool.query(query, values);
            console.log('gotCourses', result);
            res.json( result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        }
    }
}

export async function addCourse(req: Request, res: Response) {
    const c = req.body;
    const userId = req?.user?.id as number;

    if (c.USER_ID !== userId) {
        return res.status(401).json({ error: 'Invalid user ID' });
    }

    const query = 'insert into courses (TITRE, DISTANCE, DENIVELE, NOM_COURSE, DATE, SPORT_ID, USER_ID)'
        + 'VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [c.TITRE, c.DISTANCE, c.DENIVELE, c.NOM_COURSE, format(c.DATE, 'yyyy-MM-dd'), c.SPORT_ID, userId];
    try {
        const [result] = await pool.query<ResultSetHeader>(query, values);
        console.log('addedCourse', result);
        const courseAdded: Course = {
            ID: result.insertId,
            TITRE: req.body.TITRE,
            DISTANCE: req.body.DISTANCE,
            DENIVELE: req.body.DENIVELE,
            NOM_COURSE: req.body.NOM_COURSE,
            DATE: req.body.DATE,
            TIME: req.body.TIME,
            FINISHED: req.body.FINISHED,
            SPORT_ID: req.body.SPORT_ID,
            USER_ID: userId,
            GPX_FILE: req.body.GPX_FILE,
        };
        res.json(courseAdded);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}


export async function deleteCourse(req: Request, res: Response) {
    console.log('deleting course', req.params.sportId);
    const query = 'DELETE FROM courses where id = ?';
    try {
        const [result] = await pool.query(query, [req.params.sportId]);
        console.log('deletedCourses', result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}

