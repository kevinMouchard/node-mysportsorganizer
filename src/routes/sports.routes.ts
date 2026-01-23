import {getAllSports} from "../controllers/sports.controller.js";

import { Router } from 'express';
const router = Router();


router.get('/', getAllSports);
export default router;
