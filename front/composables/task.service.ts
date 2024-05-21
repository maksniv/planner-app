import { type ITaskResponse, type TypeTaskFormState } from '~/types/task.types';

const BASE_URL = 'user/tasks';

const getTasks = async (isCompleted?: boolean, search?: string, groupId?: string | null) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.get<ITaskResponse[]>(`${BASE_URL}?isCompleted=${isCompleted}&search=${search}&groupId=${groupId}`);
  return response;
};

const getTaskById = async (id: string) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.get<ITaskResponse>(`${BASE_URL}/${id}`);
  return response;
};

const createTask = async (data: TypeTaskFormState) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.post(BASE_URL, data);
  return response;
};

const updateTask = async (id: string, data: TypeTaskFormState) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.put(`${BASE_URL}/${id}`, data);
  return response;
};

const deleteTask = async (id: string) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.delete(`${BASE_URL}/${id}`);
  return response;
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
