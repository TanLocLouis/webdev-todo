import { TasksService } from '../services/tasksService';
import { TasksRepository } from '../repositories/tasksRepository';

jest.mock('../repositories/tasksRepository');

describe('TasksService', () => {
  let service: TasksService;
  let mockRepositoryInstance: jest.Mocked<TasksRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TasksService();
    mockRepositoryInstance = (TasksRepository as jest.Mock).mock.instances[0] as jest.Mocked<TasksRepository>;
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const mockTask = { id: '1', title: 'Task 1', completed: false };
      mockRepositoryInstance.create.mockResolvedValue(mockTask as any);

      const result = await service.createTask({ title: 'Task 1' });
      expect(result).toEqual(mockTask);
      expect(mockRepositoryInstance.create).toHaveBeenCalledWith({ title: 'Task 1' });
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const mockTask = { id: '1', title: 'Updated Task', completed: false };
      mockRepositoryInstance.update.mockResolvedValue(mockTask as any);

      const result = await service.updateTask('1', { title: 'Updated Task' });
      expect(result).toEqual(mockTask);
      expect(mockRepositoryInstance.update).toHaveBeenCalledWith('1', { title: 'Updated Task' });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const mockTask = { id: '1', title: 'Task 1', completed: false };
      mockRepositoryInstance.delete.mockResolvedValue(mockTask as any);

      const result = await service.deleteTask('1');
      expect(result).toEqual(mockTask);
      expect(mockRepositoryInstance.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('toggleComplete', () => {
    it('should toggle task complete status', async () => {
      const mockTask = { id: '1', title: 'Task 1', completed: true };
      mockRepositoryInstance.toggleComplete.mockResolvedValue(mockTask as any);

      const result = await service.toggleComplete('1');
      expect(result).toEqual(mockTask);
      expect(mockRepositoryInstance.toggleComplete).toHaveBeenCalledWith('1');
    });
  });

  describe('listTasks', () => {
    it('should list tasks with pagination and filter', async () => {
      const mockResult = {
        tasks: [{ id: '1', title: 'Task 1', completed: false }],
        total: 1
      };
      mockRepositoryInstance.list.mockResolvedValue(mockResult as any);

      const filters = { page: 1, limit: 10, search: 'Task', completed: false };
      const result = await service.listTasks(filters);

      expect(result).toEqual(mockResult);
      expect(mockRepositoryInstance.list).toHaveBeenCalledWith(filters);
    });
  });
});
