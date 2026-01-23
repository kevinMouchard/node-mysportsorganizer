import {pool} from "../db/connection.js";
import type {Request, Response} from 'express';
import {format} from "date-fns";

export async function getAllCoursesBySportId(req: Request, res: Response) {
    if (req.params.sportId) {
        const sportId = parseInt(req.params.sportId as string, 10);
        const query = 'SELECT * FROM courses where SPORT_ID = ' + sportId;
        try {
            const [result] = await pool.query(query);
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
    console.log('adding course', c.titre);

    const query = 'insert into courses (TITRE, DISTANCE, DENIVELE, NOM_COURSE, DATE, SPORT_ID)'
        + ' VALUES (' + '"' + c.TITRE + '"' + ', ' + '"' + c.DISTANCE + '"' + ', ' + '"' + c.DENIVELE + '"' + ', ' + '"' + c.NOM_COURSE + '"' + ', ' + '"' + format(c.DATE, 'yyyy-MM-dd') + '"' + ', ' + '"' + c.SPORT_ID + '"' + ')';
    try {
        const [result] = await pool.query(query, c);
        console.log('addedCourse', result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}


export async function deleteCourse(req: Request, res: Response) {
    console.log('deleting course', req.params.sportId);

    const query = 'DELETE FROM courses where id = ' + req.params.sportId;
    try {
        const [result] = await pool.query(query);
        console.log('deletedCourses', result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}

