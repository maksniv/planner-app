export enum EnumTaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface ITaskResponse {
  id: String;
  name: String;
  content?: String;
  priority?: EnumTaskPriority;
  isCompleted: Boolean;
  createdAt: String;
  updatedAt: String;
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updateAt'>>;
