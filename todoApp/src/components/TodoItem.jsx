import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, editTodo, deleteTodo } from "../features/todos/todoSlice";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function save() {
    dispatch(editTodo({ id: todo.id, text: draft }));
    setEditing(false);
  }
  function cancel() {
    setDraft(todo.text);
    setEditing(false);
  }
  return (
    <li className="list-group-item d-flex align-items-center gap-3">
      <input
        type="checkbox"
        className="form-check-input m-0"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        aria-label={`Mark "${todo.text}" as ${
          todo.completed ? "active" : "completed"
        }`}
      />

      {editing ? (
        <input
          className="form-control form-control-sm"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
        />
      ) : (
        <span
          className={`flex-grow-1 ${
            todo.completed ? "text-decoration-line-through text-muted" : ""
          }`}
          onDoubleClick={() => setEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <button
        className="btn btn-sm btn-outline-danger ms-auto"
        onClick={() => dispatch(deleteTodo(todo.id))}
        aria-label={`Delete "${todo.text}"`}
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
