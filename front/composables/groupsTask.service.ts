import type {
  IgroupsTaskResponse,
  TypeGroupsTaskFormState,
} from '@/types/groupsTask.types';

const BASE_URL = 'user/groups-task';

const getGroupsTask = async () => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.get<IgroupsTaskResponse[]>(BASE_URL);
  return response;
};

const createGroupTask = async (data: TypeGroupsTaskFormState) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.post(BASE_URL, data);
  return response;
};

const updateGroupTask = async (id: string, data: TypeGroupsTaskFormState) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.put(`${BASE_URL}/${id}`, data);
  return response;
};

const deleteGroupTask = async (id: string) => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.delete(`${BASE_URL}/${id}`);
  return response;
};

export { getGroupsTask, createGroupTask, updateGroupTask, deleteGroupTask };
