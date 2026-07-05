import { TasksRepository } from '../repositories/tasksRepository';
import { ITask } from '../models/Task';

export class TasksService {
  private tasksRepository: TasksRepository;

  constructor() {
    this.tasksRepository = new TasksRepository();
  }

  async createTask(data: { title: string; description?: string; completed?: boolean }): Promise<ITask> {
    // Business logic (if any) goes here before saving
    return await this.tasksRepository.create(data);
  }

  async updateTask(id: string, data: Partial<{ title: string; description: string; completed: boolean }>): Promise<ITask | null> {
    return await this.tasksRepository.update(id, data);
  }

  async deleteTask(id: string): Promise<ITask | null> {
    return await this.tasksRepository.delete(id);
  }

  async toggleComplete(id: string): Promise<ITask | null> {
    return await this.tasksRepository.toggleComplete(id);
  }

  async listTasks(filters: {
    search?: string;
    completed?: boolean;
    page: number;
    limit: number;
  }): Promise<{ tasks: ITask[]; total: number }> {
    return await this.tasksRepository.list(filters);
  }
}
