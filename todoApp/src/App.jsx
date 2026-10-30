import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

export default function App() {
  return (
    <main className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="text-center mb-4">Todos</h1>
      <TodoForm />
      <TodoList />
      <FilterBar />
    </main>
  );
}
