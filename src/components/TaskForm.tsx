import type React from "react"
import { TASK_STATUS, type AddTaskPayload, type Task, type TaskStatus, type UpdateTaskPayload } from "../types/task.types";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/slices/task.slice";
import { useRef, useState } from "react";
import { isoToDateInput, localDateToISO } from "../utils/date.utils";

type TaskFormProps = {
    selectedTask: Task | null,
    onDone?: () => void
}

type FormErrors = {
    title?: string,
    dueDate?: string
}

export default function TaskForm(props: TaskFormProps) {
    const { selectedTask } = props;
    const [title, setTitle] = useState(selectedTask?.title ?? "");
    const [description, setDescription] = useState(selectedTask?.description ?? "");
    const [dueDate, setDueDate] = useState(selectedTask?.dueDate ? isoToDateInput(selectedTask.dueDate) : "");
    const [status, setStatus] = useState<TaskStatus>(selectedTask?.status ?? TASK_STATUS.PENDING)
    const [errors, setErrors] = useState<FormErrors>({})
    const dueDateInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const validateForm = () => {
        const nextErrors: FormErrors = {};
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            nextErrors.title = "Title is required.";
        } else if (trimmedTitle.length < 3) {
            nextErrors.title = "Title must be at least 3 characters.";
        }

        if (dueDateInputRef.current?.validity.badInput) {
            nextErrors.dueDate = "Date is not valid.";
        } else if (!dueDate) {
            nextErrors.dueDate = "Due date is required.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        const trimmedTitle = title.trim();
        const dueDateISO = localDateToISO(dueDate)
        if (selectedTask?.id) {
            const updatedTask: UpdateTaskPayload = {
                id: selectedTask.id,
                title: trimmedTitle,
                description: description,
                dueDate: dueDateISO,
                status: status
            }
            dispatch(updateTask(updatedTask))
            props.onDone?.()
        } else {
            const newTask: AddTaskPayload = {
                title: trimmedTitle,
                description,
                dueDate: dueDateISO
            }
            dispatch(addTask(newTask))
            props.onDone?.()
        }

    }
    return (
        <form className="space-y-4 p-5" onSubmit={handleSubmit} noValidate>
            <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Title</span>
                <input
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ${errors.title ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"}`}
                    type="text"
                    placeholder="Task title"
                    name="title"
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? "title-error" : undefined}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        if (errors.title) {
                            setErrors((currentErrors) => ({ ...currentErrors, title: undefined }))
                        }
                    }}
                />
                {errors.title && <p className="mt-1.5 text-sm text-red-600" id="title-error">{errors.title}</p>}
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
                        ref={dueDateInputRef}
                        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 ${errors.dueDate ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"}`}
                        type="date"
                        placeholder="Due Date"
                        name="dueDate"
                        aria-invalid={Boolean(errors.dueDate)}
                        aria-describedby={errors.dueDate ? "due-date-error" : undefined}
                        value={dueDate}
                        onChange={(e) => {
                            setDueDate(e.target.value)
                            if (errors.dueDate) {
                                setErrors((currentErrors) => ({ ...currentErrors, dueDate: undefined }))
                            }
                        }}
                    />
                    {errors.dueDate && <p className="mt-1.5 text-sm text-red-600" id="due-date-error">{errors.dueDate}</p>}
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
