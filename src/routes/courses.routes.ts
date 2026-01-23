import { Router } from 'express';
import {authMiddleware} from "../middleware/auth.middleware.js";
import {addCourse, deleteCourse, getAllCoursesBySportId} from "../controllers/courses.controller.js";
const router = Router();


router.get('/:sportId', authMiddleware, getAllCoursesBySportId);
router.post('/', authMiddleware, addCourse);
router.delete('/:sportId', authMiddleware, deleteCourse);

export default router;
