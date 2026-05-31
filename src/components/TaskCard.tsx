import { useDispatch } from "react-redux";
import type { Task } from "../types/task.types"
import { deleteTask, selectTask } from "../store/slices/task.slice";

type TaskCardProps = {
    task: Task
}
export default function TaskCard(props: TaskCardProps) {
    const { task } = props;
    const dispatch = useDispatch();
    const handleDelete = async () => {
        const confirmed = await confirm("Are you sure you want to delete " + props.task.title)
        if (confirmed) {
            dispatch(deleteTask({ id: task.id}))
        }
    }
    const handleEdit = () => {
        dispatch(selectTask({id: props.task.id}))
    }
    return (
        <div className="border">
            <div>{task.id}</div>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.status}</div>
            <div>Created At: {task.createdAt}</div>
            <div>Due At: {task.dueDate}</div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

}