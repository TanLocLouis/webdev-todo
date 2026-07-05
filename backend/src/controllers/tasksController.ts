import { Request, Response, NextFunction } from 'express';
import { TasksService } from '../services/tasksService';

export class TasksController {
  private tasksService: TasksService;

  constructor() {
    this.tasksService = new TasksService();
  }

  createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, description, completed } = req.body;
      const task = await this.tasksService.createTask({ title, description, completed });
      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };
}

const tasksController = new TasksController();
export default tasksController;
