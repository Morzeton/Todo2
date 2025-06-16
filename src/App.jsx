import { useContext, useState } from "react";
import styles from "./App.module.css";
import TodoForm from "./Components/TodoForm";
import TodoSearch from "./Components/TodoSearch";
import TodoList from "./Components/TodoList";
import TodoContext from "./TodoContext";

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function App() {
    const { items, isLoading, addTodo, deleteTodo, toggleComplete, editTodo } =
        useContext(TodoContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSorting, setIsSorting] = useState(false);

    const debouncedSearch = debounce((term) => setSearchTerm(term), 300);

    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedItems = isSorting
        ? [...filteredItems].sort((a, b) => a.title.localeCompare(b.title))
        : filteredItems;

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={styles.app}>
            <h3>Список задач</h3>
            <TodoForm onAddTodo={addTodo} isLoading={isLoading} />
            <TodoSearch
                onSearch={debouncedSearch}
                isSorting={isSorting}
                toggleSort={() => setIsSorting(!isSorting)}
            />
            <TodoList
                items={displayedItems}
                isLoading={isLoading}
                onToggleComplete={toggleComplete}
                onDelete={deleteTodo}
                onEdit={editTodo}
            />
        </div>
    );
}

export default App;
