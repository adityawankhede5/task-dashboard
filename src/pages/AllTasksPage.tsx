import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { visibleTasksSelector } from "../store/selectors/task.selectors";
import SortBy from "../components/SortBy";
import FilterBy from "../components/FilterBy";
import TasksSummary from "../components/TasksSummary";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function AllTasksPage() {

  const visibleTasksList = useSelector(visibleTasksSelector);
  const { selectedTask } = useSelector((state: RootState) => state.tasks)
    return (
        <>
            <header>
                <SortBy />
                <FilterBy />
            </header>
            <TasksSummary />
            <TaskForm selectedTask={selectedTask} />
            <TaskList tasks={visibleTasksList} />
        </>
    )
}