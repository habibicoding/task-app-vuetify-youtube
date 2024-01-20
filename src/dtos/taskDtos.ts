export enum TaskState {
  OPEN, CLOSED
}

export enum Priority {
  LOW, MEDIUM, HIGH
}

export interface TaskFetchResponse {
  id: number,
  description: string,
  isReminderSet: boolean | null,
  isTaskOpen: boolean | null,
  createdOn: string | null,
  priority: Priority | null
}

export interface TaskCreateRequest {
  description: string,
  isReminderSet: boolean,
  isTaskOpen: boolean,
  priority: Priority
}

export interface TaskUpdateRequest {
  description: string | null,
  isReminderSet: boolean | null,
  isTaskOpen: boolean | null,
  priority: Priority | null
}
