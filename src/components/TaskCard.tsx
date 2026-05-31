import { useDispatch } from "react-redux";
import { TASK_STATUS, type Task } from "../types/task.types"
import { deleteTask, selectTask } from "../store/slices/task.slice";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";

type TaskCardProps = {
    task: Task,
    onEdit?: () => void
}
export default function TaskCard(props: TaskCardProps) {
    const { task } = props;
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
    const handleDelete = async () => {
        const confirmed = await confirm("Are you sure you want to delete " + props.task.title)
        if (confirmed) {
            dispatch(deleteTask({ id: task.id}))
        }
    }
    const handleEdit = () => {
        dispatch(selectTask({id: props.task.id}))
        props.onEdit?.()
    }
    return (
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusClassName}`}>
                            {statusLabel}
                        </span>
                        <span className="text-xs text-slate-400">ID: {task.id}</span>
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
    )

}
