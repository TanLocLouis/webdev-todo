import { Router } from 'express';
import { validateRequest } from '../middlewares/validateMiddleware';
import tasksController from '../controllers/tasksController';
import { createTaskValidator, updateTaskValidator, taskIdValidator } from '../validators/tasksValidator';

const router = Router();

router.post('/',
    createTaskValidator,
    validateRequest,
    tasksController.createTask
)

router.put('/:id',
    updateTaskValidator,
    validateRequest,
    tasksController.updateTask
)

router.delete('/:id',
    taskIdValidator,
    validateRequest,
    tasksController.deleteTask
)

router.patch('/:id/toggle',
    taskIdValidator,
    validateRequest,
    tasksController.toggleCompleteTask
)

export default router;