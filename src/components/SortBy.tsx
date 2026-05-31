import { useDispatch, useSelector } from "react-redux";
import { selectSortBy } from "../store/selectors/task.selectors";
import { TASK_SORT_BY, type TaskSortBy } from "../types/task.types";
import { setSortBy } from "../store/slices/task.slice";

export default function SortBy() {
    const sortBy = useSelector(selectSortBy);
    const dispatch = useDispatch();
    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(e.target.value as TaskSortBy))
    }
    return (
        <div>
            Sort by
            <select value={sortBy} onChange={handleSortByChange}>
                <option value={TASK_SORT_BY.CREATED_AT}>{TASK_SORT_BY.CREATED_AT}</option>
                <option value={TASK_SORT_BY.DUE_DATE}>{TASK_SORT_BY.DUE_DATE}</option>
            </select>
        </div>
    )
}