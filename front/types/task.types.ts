export enum EnumTaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface ITaskResponse {
  id: string;
  name: string;
  content?: string;
  priority?: EnumTaskPriority;
  taskGroupId: string;
  taskGroup: { id: string, name: string }
  isCompleted: boolean;
  deadlines: string;
  createdAt: string;
  updatedAt: string;
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updateAt'>>;
