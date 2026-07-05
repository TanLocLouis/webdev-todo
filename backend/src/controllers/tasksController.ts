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

  updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const { title, description, completed } = req.body;
      const task = await this.tasksService.updateTask(id, { title, description, completed });
      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const task = await this.tasksService.deleteTask(id);
      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  toggleCompleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const task = await this.tasksService.toggleComplete(id);
      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
        });
        return;
      }
      res.status(200).json({
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
