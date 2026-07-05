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

  async list(filters: {
    search?: string;
    completed?: boolean;
    page: number;
    limit: number;
  }): Promise<{ tasks: ITask[]; total: number }> {
    const query: any = {};
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }
    if (filters.completed !== undefined) {
      query.completed = filters.completed;
    }

    const skip = (filters.page - 1) * filters.limit;
    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(filters.limit),
      Task.countDocuments(query),
    ]);

    return { tasks, total };
  }
}
