import { useSelector } from "react-redux";
import TaskList from "../components/TaskList";
import { selectCompletedTasks } from "../store/selectors/task.selectors";

export default function CompletedTasksPage() {
    const completedTasks = useSelector(selectCompletedTasks)
    return (
        <div className="space-y-5">
            <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Completed Tasks</h2>
                <p className="mt-1 text-sm text-slate-500">Tasks marked as completed are shown here.</p>
            </header>
            <TaskList tasks={completedTasks} />
        </div>
    )
}
