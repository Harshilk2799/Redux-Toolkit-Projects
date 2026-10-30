import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  selectCounts,
  setFilter,
  toggleAll,
  clearCompleted,
} from "../features/todos/todoSlice";

const FILTERS = ["all", "active", "completed"];

export default function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const { total, active, completed } = useSelector(selectCounts);
  console.log("Total: ", total);
  console.log("Active: ", active);
  console.log("Completed: ", completed);
  if (total === 0) return null;

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
      <span className="text-muted small">{active} left</span>

      <div className="btn-group btn-group-sm" role="group">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`btn btn-outline-primary text-capitalize ${
              f === filter ? "active" : ""
            }`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => dispatch(toggleAll())}
        >
          Toggle all
        </button>
        {completed > 0 && (
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => dispatch(clearCompleted())}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
