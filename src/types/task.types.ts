export const TASK_STATUS = {
    PENDING: "pending",
    IN_PROGRESS: "inProgress",
    COMPLETED: "completed",
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export type TasksSummary = Record<TaskStatus | "all", number>

export const TASK_SORT_BY = {
    DUE_DATE: "dueDate",
    CREATED_AT: "createdAt"
} as const;

export type TaskSortBy = (typeof TASK_SORT_BY)[keyof typeof TASK_SORT_BY]

export const TASK_FILTER_BY = {
    ALL: "All",
    ...TASK_STATUS
}

export type TaskFilterBy = (typeof TASK_FILTER_BY)[keyof typeof TASK_FILTER_BY]

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
    createdAt: string;
}

export type TaskState = {
    list: Task[],
    selectedTask: Task | null,
    sortBy: TaskSortBy
    filterBy: TaskFilterBy
}

export type AddTaskPayload = {
    title: string;
    description: string;
    dueDate: string;
}

export type UpdateTaskPayload = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
}