import { AxiosWithAuth } from '~/plugins/axios';
import { type ITaskResponse, type TypeTaskFormState } from '~/types/task.types';

class TaskService {
  private BASE_URL = 'user/tasks';

  async getTasks() {
    const response = await AxiosWithAuth.get<ITaskResponse[]>(this.BASE_URL);
    return response;
  }

  async createTask(data: TypeTaskFormState) {
    const response = await AxiosWithAuth.post(this.BASE_URL, data);
    return response;
  }

  async updateTask(id: string, data: TypeTaskFormState) {
    const response = await AxiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
    return response;
  }

  async deleteTask(id: string) {
    const response = await AxiosWithAuth.delete(`${this.BASE_URL}/${id}`);
    return response;
  }
}

export const tasksService = new TaskService();
