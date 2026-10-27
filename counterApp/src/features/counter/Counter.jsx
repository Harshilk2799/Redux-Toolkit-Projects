import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  selectCount,
} from "./counterSlice";

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm text-center" style={{ width: "26rem" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Redux Toolkit Counter</h5>
        </div>

        <div className="card-body">
          <h1 className="display-3 fw-bold mb-4">{count}</h1>

          <div className="d-flex justify-content-center gap-2 mb-3">
            <button
              className="btn btn-success"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <button
              className="btn btn-danger"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
          </div>

          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(incrementByAmount(10))}
            >
              Increment by 10
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => dispatch(reset())}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
