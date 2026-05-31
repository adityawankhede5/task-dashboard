import { useDispatch, useSelector } from "react-redux";
import { selectFilterBy } from "../store/selectors/task.selectors";
import { TASK_FILTER_BY } from "../types/task.types";
import { setFilterBy } from "../store/slices/task.slice";

export default function FilterBy() {
    const filterBy = useSelector(selectFilterBy);
    const dispatch = useDispatch();
    const handleFilterByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilterBy(e.target.value))
    }
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Filter by</span>
            <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={filterBy}
                onChange={handleFilterByChange}
            >
                <option value={TASK_FILTER_BY.ALL}>All</option>
                <option value={TASK_FILTER_BY.PENDING}>Pending</option>
                <option value={TASK_FILTER_BY.IN_PROGRESS}>In Progress</option>
                <option value={TASK_FILTER_BY.COMPLETED}>Completed</option>
            </select>
        </label>
    )
}
