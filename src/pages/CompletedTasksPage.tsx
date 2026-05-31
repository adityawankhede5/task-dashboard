import { useSelector } from "react-redux";
import TaskList from "../components/TaskList";
import { selectCompletedTasks } from "../store/selectors/task.selectors";

export default function CompletedTasksPage() {
    const completedTasks = useSelector(selectCompletedTasks)
    return (
        <div>
            <h1>Completed tasks</h1>
            <TaskList tasks={completedTasks} />
        </div>
    )
}