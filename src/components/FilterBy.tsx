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
        <div>
            Filter by
            <select value={filterBy} onChange={handleFilterByChange}>
                <option value={TASK_FILTER_BY.ALL}>{TASK_FILTER_BY.ALL}</option>
                <option value={TASK_FILTER_BY.PENDING}>{TASK_FILTER_BY.PENDING}</option>
                <option value={TASK_FILTER_BY.IN_PROGRESS}>{TASK_FILTER_BY.IN_PROGRESS}</option>
                <option value={TASK_FILTER_BY.COMPLETED}>{TASK_FILTER_BY.COMPLETED}</option>
            </select>
        </div>
    )
}