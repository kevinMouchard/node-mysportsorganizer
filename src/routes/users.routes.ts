import {addUser} from "../controllers/users.controller.js";
import { Router } from 'express';
const router = Router();


router.post('/', addUser);
export default router;
