export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedTasksResponse {
  tasks: Task[];
  pagination: PaginationInfo;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
