import { Router } from 'express';
import { validateRequest } from '../middlewares/validateMiddleware';
import tasksController from '../controllers/tasksController';
import { createTaskValidator } from '../validators/tasksValidator';

const router = Router();

router.post('/',
    createTaskValidator,
    validateRequest,
    tasksController.createTask
)

export default router;