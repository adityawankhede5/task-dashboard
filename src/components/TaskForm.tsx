import type React from "react"
import { TASK_STATUS, type AddTaskPayload, type Task, type TaskStatus, type UpdateTaskPayload } from "../types/task.types";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/slices/task.slice";
import { useEffect, useState } from "react";
import { isoToDateInput, localDateToISO } from "../utils/date.utils";

type TaskFormProps = {
    selectedTask: Task | null,
    onDone?: () => void
}

export default function TaskForm(props: TaskFormProps) {
    const { selectedTask } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState<TaskStatus>(TASK_STATUS.PENDING)
    const dispatch = useDispatch();
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) return;
        if (!dueDate) return;
        const dueDateISO = localDateToISO(dueDate)
        if (selectedTask?.id) {
            const updatedTask: UpdateTaskPayload = {
                id: selectedTask.id,
                title: title,
                description: description,
                dueDate: dueDateISO,
                status: status
            }
            dispatch(updateTask(updatedTask))
            props.onDone?.()
        } else {
            const newTask: AddTaskPayload = {
                title,
                description,
                dueDate: dueDateISO
            }
            dispatch(addTask(newTask))
            props.onDone?.()
        }

    }

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect */
        setTitle(selectedTask?.title ?? "")
        setDescription(selectedTask?.description ?? "")
        if (selectedTask?.dueDate) {
            const isoToLocalDate = isoToDateInput(selectedTask?.dueDate)
            setDueDate(isoToLocalDate);
        } else {
            setDueDate("")
        }
        setStatus(selectedTask?.status ?? TASK_STATUS.PENDING)
        /* eslint-enable react-hooks/set-state-in-effect */
    }, [selectedTask])
    return (
        <form className="space-y-4 p-5" onSubmit={handleSubmit}>
            <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Title</span>
                <input
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    type="text"
                    placeholder="Task title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Description</span>
                <input
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    type="text"
                    placeholder="Short description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Due date</span>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        type="date"
                        placeholder="Due Date"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>
                <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Status</span>
                    <select
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        disabled={!props.selectedTask?.id}
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    >
                        <option value={TASK_STATUS.PENDING}>Pending</option>
                        <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
                        <option value={TASK_STATUS.COMPLETED}>Completed</option>
                    </select>
                </label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    type="submit"
                >
                    {props.selectedTask?.id ? "Update Task" : "Add Task"}
                </button>
            </div>
        </form>
    )
}
