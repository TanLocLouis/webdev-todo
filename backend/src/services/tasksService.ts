import { TasksRepository } from '../repositories/tasksRepository';
import { ITask } from '../models/Task';

export class TasksService {
  private tasksRepository: TasksRepository;

  constructor() {
    this.tasksRepository = new TasksRepository();
  }

  async createTask(data: { title: string; description?: string; completed?: boolean }): Promise<ITask> {
    return await this.tasksRepository.create(data);
  }
}
