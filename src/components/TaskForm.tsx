import type React from "react"
import { TASK_STATUS, type AddTaskPayload, type Task, type TaskStatus, type UpdateTaskPayload } from "../types/task.types";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/slices/task.slice";
import { useEffect, useState } from "react";
import { isoToDateInput, localDateToISO } from "../utils/date.utils";

type TaskFormProps = {
    selectedTask: Task | null
}

export default function TaskForm(props: TaskFormProps) {
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
        if (props.selectedTask?.id) {
            const { selectedTask } = props;
            const updatedTask: UpdateTaskPayload = {
                id: selectedTask.id,
                title: title,
                description: description,
                dueDate: dueDateISO,
                status: status
            }
            dispatch(updateTask(updatedTask))
        } else {
            const newTask: AddTaskPayload = {
                title,
                description,
                dueDate: dueDateISO
            }
            dispatch(addTask(newTask))
        }

    }

    useEffect(() => {
        const { selectedTask } = props;
        setTitle(selectedTask?.title ?? "")
        setDescription(selectedTask?.description ?? "")
        if (selectedTask?.dueDate) {
            const isoToLocalDate = isoToDateInput(selectedTask?.dueDate)
            setDueDate(isoToLocalDate);
        } else {
            setDueDate("")
        }
        setStatus(selectedTask?.status ?? TASK_STATUS.PENDING)
    }, [props.selectedTask])
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" name="title" required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text" placeholder="Description" name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input type="date" placeholder="Due Date" name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <select disabled={!props.selectedTask?.id} name="status" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                <option value={TASK_STATUS.PENDING}>{TASK_STATUS.PENDING}</option>
                <option value={TASK_STATUS.IN_PROGRESS}>{TASK_STATUS.IN_PROGRESS}</option>
                <option value={TASK_STATUS.COMPLETED}>{TASK_STATUS.COMPLETED}</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}