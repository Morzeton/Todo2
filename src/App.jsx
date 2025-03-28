import { useState, useEffect } from "react";
import styles from "./App.module.css";
import TodoForm from "./Components/TodoForm";
import TodoSearch from "./Components/TodoSearch";
import TodoList from "./Components/TodoList";

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function App() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/todos")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Ошибка загрузки:", error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleAddTodo = (newTitle) => {
        if (!newTitle.trim()) return;

        const newTodo = { title: newTitle.trim(), completed: false };
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
        })
            .then((response) => response.json())
            .then((addedTodo) => setItems((prev) => [...prev, addedTodo]))
            .catch((error) => console.error("Ошибка добавления:", error));
    };

    const handleToggleComplete = (id) => {
        const todo = items.find((item) => item.id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };

        fetch(`http://localhost:3000/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: updatedTodo.completed }),
        })
            .then(() => {
                setItems((prev) =>
                    prev.map((item) => (item.id === id ? updatedTodo : item))
                );
            })
            .catch((error) => console.error("Ошибка обновления:", error));
    };

    const handleDeleteTodo = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
        })
            .then(() =>
                setItems((prev) => prev.filter((item) => item.id !== id))
            )
            .catch((error) => console.error("Ошибка удаления:", error));
    };

    const handleEditTodo = (id, newText) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newText }),
        })
            .then(() => {
                setItems((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, title: newText } : item
                    )
                );
            })
            .catch((error) => console.error("Ошибка редактирования:", error));
    };

    const debouncedSearch = debounce((term) => setSearchTerm(term), 300);

    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedItems = isSorting
        ? [...filteredItems].sort((a, b) => a.title.localeCompare(b.title))
        : filteredItems;

    return (
        <div className={styles.app}>
            <h3>Список задач</h3>
            <TodoForm onAddTodo={handleAddTodo} isLoading={isLoading} />
            <TodoSearch
                onSearch={debouncedSearch}
                isSorting={isSorting}
                toggleSort={() => setIsSorting(!isSorting)}
            />
            <TodoList
                items={displayedItems}
                isLoading={isLoading}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
            />
        </div>
    );
}

export default App;
