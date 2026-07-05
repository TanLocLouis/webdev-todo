import axios from 'axios'
import type { ApiResponse, Task, PaginatedTasksResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTasks = async (params: {
  page?: number;
  limit?: number;
  completed?: boolean | string;
  search?: string;
}): Promise<PaginatedTasksResponse> => {
  const { data } = await api.get<ApiResponse<PaginatedTasksResponse>>('/tasks', { params })
  return data.data
}

export const createTask = async (task: {
  title: string;
  description?: string;
  completed?: boolean;
}): Promise<Task> => {
  const { data } = await api.post<ApiResponse<Task>>('/tasks', task)
  return data.data
}

export const updateTask = async (
  id: string,
  task: {
    title?: string;
    description?: string;
    completed?: boolean;
  }
): Promise<Task> => {
  const { data } = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task)
  return data.data
}

export const toggleTask = async (id: string): Promise<Task> => {
  const { data } = await api.patch<ApiResponse<Task>>(`/tasks/${id}/toggle`)
  return data.data
}

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}

export default api
