import { useSelector } from "react-redux";
import { selectTasksSummary } from "../store/selectors/task.selectors";

export default function TasksSummary() {
    const summary = useSelector(selectTasksSummary)
    return (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-slate-500">All tasks</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.all}</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-amber-700">Pending</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.pending}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-blue-700">In Progress</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.inProgress}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-emerald-700">Completed</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.completed}</p>
            </div>
        </div>
    )
}
