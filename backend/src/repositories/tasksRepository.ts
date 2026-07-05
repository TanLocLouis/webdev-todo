import { Task, ITask } from '../models/Task';

export class TasksRepository {
  async create(data: { title: string; description?: string; completed?: boolean }): Promise<ITask> {
    const task = new Task(data);
    return await task.save();
  }
}
