import { Task, ITask } from '../models/Task';

export class TasksRepository {
  async create(data: { title: string; description?: string; completed?: boolean }): Promise<ITask> {
    const task = new Task(data);
    return await task.save();
  }

  async update(id: string, data: Partial<{ title: string; description: string; completed: boolean }>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }

  async toggleComplete(id: string): Promise<ITask | null> {
    const task = await Task.findById(id);
    if (!task) return null;
    task.completed = !task.completed;
    return await task.save();
  }
}
