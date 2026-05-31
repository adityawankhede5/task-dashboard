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
        <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Sort by</span>
            <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={sortBy}
                onChange={handleSortByChange}
            >
                <option value={TASK_SORT_BY.CREATED_AT}>Created At</option>
                <option value={TASK_SORT_BY.DUE_DATE}>Due Date</option>
            </select>
        </label>
    )
}
