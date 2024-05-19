export interface ITaskResponse {
  id: string;
  name: string;
  content?: string;
  taskGroupId: string;
  taskGroup: { id: string, name: string, color?: string }
  isCompleted: boolean;
  deadlines: string;
  createdAt: string;
  updatedAt: string;
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updateAt'>>;
