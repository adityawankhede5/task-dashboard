import { useSelector } from "react-redux";
import { selectTasksSummary } from "../store/selectors/task.selectors";

export default function TasksSummary() {
    const summary = useSelector(selectTasksSummary)
    return (
        <div className="flex gap-2">
            <div>All: {summary.all}</div>
            <div>Pending: {summary.all}</div>
            <div>In Progress: {summary.inProgress}</div>
            <div>Completed: {summary.completed}</div>
        </div>
    )
}