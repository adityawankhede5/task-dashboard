import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TASK_FILTER_BY, TASK_SORT_BY, TASK_STATUS, type AddTaskPayload, type TaskFilterBy, type TaskSortBy, type Task, type TaskState, type UpdateTaskPayload } from "../../types/task.types";

const INITIAL_STATE: TaskState = {
    list: [],
    selectedTask: null,
    sortBy: TASK_SORT_BY.CREATED_AT,
    filterBy: TASK_FILTER_BY.ALL
};

const taskSlice = createSlice({
    name: "tasks",
    initialState: INITIAL_STATE,
    reducers: {
        initTasks: (state) => {
            const existingTasks = localStorage.getItem("tasks");
            if (!existingTasks) return;
            const tasksList = JSON.parse(existingTasks) as Task[];
            state.list = tasksList;
        },
        addTask: (state, action: PayloadAction<AddTaskPayload>) => {
            const { payload } = action;
            const newTask: Task = {
                id: crypto.randomUUID(),
                title: payload.title,
                description: payload.description,
                dueDate: payload.dueDate,
                status: TASK_STATUS.PENDING,
                createdAt: new Date().toISOString()
            }
            state.list.push(newTask)
            localStorage.setItem("tasks", JSON.stringify(state.list))
        },
        selectTask: (state, action: PayloadAction<{ id: string}>) => {
            const task = state.list.find(item => item.id === action.payload.id);
            state.selectedTask = task ?? null;
        },
        updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
            const { payload } = action;
            const index = state.list.findIndex(item => item.id === payload.id)
            state.list[index] = {
                ...state.list[index],
                ...payload
            };
            localStorage.setItem("tasks", JSON.stringify(state.list))
        },
        deleteTask: (state, action: PayloadAction<{ id: string }>) => {
            const { payload } = action;
            state.list = state.list.filter(item => item.id != payload.id)
            localStorage.setItem("tasks", JSON.stringify(state.list))
        },
        setSortBy: (state, action: PayloadAction<TaskSortBy>) => {
            state.sortBy = action.payload
        },
        setFilterBy: (state, action: PayloadAction<TaskFilterBy>) => {
            state.filterBy = action.payload;
        }
    }
})

export const { initTasks, addTask, selectTask, updateTask, deleteTask, setFilterBy, setSortBy } = taskSlice.actions;
export default taskSlice.reducer;