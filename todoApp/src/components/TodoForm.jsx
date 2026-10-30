import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";

function TodoForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault;
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
