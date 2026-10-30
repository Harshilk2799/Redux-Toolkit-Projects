import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { selectVisibleTodos } from "../features/todos/todoSlice";

function TodoList() {
  const todos = useSelector(selectVisibleTodos);
  console.log("Todos: ", todos);

  if (todos.length === 0) {
    return (
      <p className="text-center text-muted my-4">
        Nothing here. Add a todo above.
      </p>
    );
  }
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
