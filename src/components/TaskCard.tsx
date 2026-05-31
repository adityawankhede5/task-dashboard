import { useDispatch } from "react-redux";
import { TASK_STATUS, type Task } from "../types/task.types"
import { deleteTask, selectTask } from "../store/slices/task.slice";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type TaskCardProps = {
    task: Task,
    onEdit?: () => void
}
export default function TaskCard(props: TaskCardProps) {
    const { task } = props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();
    const statusClassName = {
        [TASK_STATUS.PENDING]: "bg-amber-50 text-amber-700 ring-amber-200",
        [TASK_STATUS.IN_PROGRESS]: "bg-blue-50 text-blue-700 ring-blue-200",
        [TASK_STATUS.COMPLETED]: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    }[task.status]
    const statusLabel = {
        [TASK_STATUS.PENDING]: "Pending",
        [TASK_STATUS.IN_PROGRESS]: "In Progress",
        [TASK_STATUS.COMPLETED]: "Completed",
    }[task.status]
    const formatDate = (date: string) => new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    }
    const handleConfirmDelete = () => {
        dispatch(deleteTask({ id: task.id }))
        setIsDeleteModalOpen(false);
    }
    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    }
    const handleEdit = () => {
        dispatch(selectTask({id: props.task.id}))
        props.onEdit?.()
    }
    return (
        <>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusClassName}`}>
                                {statusLabel}
                            </span>
                        </div>
                        <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
                        {task.description && <p className="mt-1 text-sm text-slate-600">{task.description}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            onClick={handleEdit}
                            type="button"
                        >
                            <Pencil size={15} />
                            Edit
                        </button>
                        <button
                            className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            onClick={handleDelete}
                            type="button"
                        >
                            <Trash2 size={15} />
                            Delete
                        </button>
                    </div>
                </div>
                <div className="mt-4 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2">
                    <div className="text-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Created</p>
                        <p className="mt-1 text-slate-700">{formatDate(task.createdAt)}</p>
                    </div>
                    <div className="text-sm">
                        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                            <CalendarDays size={14} />
                            Due date
                        </p>
                        <p className="mt-1 text-slate-700">{formatDate(task.dueDate)}</p>
                    </div>
                </div>
            </article>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 px-4 py-4 sm:items-center">
                    <div
                        className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`delete-task-${task.id}`}
                    >
                        <div className="mb-4 flex items-start gap-3">
                            <span className="rounded-full bg-red-50 p-2 text-red-600">
                                <Trash2 size={20} />
                            </span>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900" id={`delete-task-${task.id}`}>
                                    Delete task?
                                </h2>
                                <p className="mt-1 text-sm text-slate-600">
                                    Are you sure you want to delete "{task.title}"? This action cannot be undone.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                onClick={handleCancelDelete}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                                onClick={handleConfirmDelete}
                                type="button"
                            >
                                Delete task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}
