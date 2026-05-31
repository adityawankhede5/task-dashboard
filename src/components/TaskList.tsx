import type { Task } from "../types/task.types"
import TaskCard from "./TaskCard";

type TaskListProps = {
    tasks: Task[],
    onEditTask?: () => void
}
export default function TaskList(props: TaskListProps) {

    const { tasks } = props;

    return (
        <div className="grid gap-3">
            {tasks.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                    <p className="font-medium text-slate-700">No tasks found</p>
                    <p className="mt-1 text-sm">Add a task or change the current filter.</p>
                </div>
            )}
            {
                tasks.map((task) => {
                    return <TaskCard key={task.id} task={task} onEdit={props.onEditTask} />
                })
            }
        </div>
    )

}
