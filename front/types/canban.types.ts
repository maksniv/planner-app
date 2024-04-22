import type { ITaskResponse } from '~/types/task.types';

export interface IColumn {
  id: string;
  name: string;
  items: ITaskResponse[]
}

export const KANBAN_COLUMNS: IColumn[] = [
  {
    id: '0',
    name: 'Просроченные',
    items: []
  }, {
    id: '1',
    name: 'На сегодня',
    items: []
  }, {
    id: '2',
    name: 'На завтра',
    items: []
  }, {
    id: '3',
    name: 'На эту неделю',
    items: []
  }, {
    id: '4',
    name: 'На следующую неделю',
    items: []
  }, {
    id: '5',
    name: 'Позже',
    items: []
  }, {
    id: '6',
    name: 'Завершенные',
    items: []
  }]