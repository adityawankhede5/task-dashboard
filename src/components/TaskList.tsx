import type { Task } from "../types/task.types"
import TaskCard from "./TaskCard";

type TaskListProps = {
    tasks: Task[]
}
export default function TaskList(props: TaskListProps) {

    const { tasks } = props;

    return (
        <div>
            {
                tasks.map((task) => {
                    return <TaskCard key={task.id} task={task} />
                })
            }
        </div>
    )

}