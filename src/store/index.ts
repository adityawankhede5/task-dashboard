import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/task.slice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;