import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { TASK_FILTER_BY, TASK_SORT_BY, TASK_STATUS, type TasksSummary } from "../../types/task.types";

const selectTaskList = (state: RootState) => state.tasks.list;
export const selectFilterBy = (state: RootState) => state.tasks.filterBy;
export const selectSortBy = (state: RootState) => state.tasks.sortBy;

export const visibleTasksSelector = createSelector(
    [
        selectTaskList,
        selectFilterBy,
        selectSortBy
    ],
    (
        taskList,
        filterBy,
        sortBy
    ) => {
        let result = [...taskList];
        if (filterBy !== TASK_FILTER_BY.ALL) {
            result = result.filter(item => item.status === filterBy)
        }
        if (sortBy === TASK_SORT_BY.CREATED_AT) {
            result.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        } else if (sortBy === TASK_SORT_BY.DUE_DATE) {
            result.sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        }
        return result;
    }
)

export const selectTasksSummary = createSelector(
    [selectTaskList],
    (taskList) => {
        const result: TasksSummary = {
            all: taskList.length,
            inProgress: 0,
            pending: 0,
            completed: 0
        }

        taskList.forEach(item => {
            if (item.status === TASK_STATUS.PENDING) ++result.pending;
            else if (item.status === TASK_STATUS.IN_PROGRESS) ++result.inProgress;
            else if (item.status === TASK_STATUS.COMPLETED) ++result.completed;
        })

        return result;
    }
)

export const selectCompletedTasks = createSelector(
    [selectTaskList],
    (tasksList) => {
        const result = tasksList.filter(item => item.status === TASK_STATUS.COMPLETED)
        return result;
    }
)
