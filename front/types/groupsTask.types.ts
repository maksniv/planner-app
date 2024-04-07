export interface IgroupsTaskResponse {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type TypeGroupsTaskFormState = Partial<
  Omit<IgroupsTaskResponse, 'id' | 'updateAt'>
>;
