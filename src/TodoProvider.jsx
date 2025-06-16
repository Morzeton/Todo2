import { useState, useEffect } from "react";
import TodoContext from "./TodoContext";

export const TodoProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/todos")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Ошибка загрузки:", error))
            .finally(() => setIsLoading(false));
    }, []);

    const addTodo = (title) => {
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, completed: false }),
        })
            .then((response) => response.json())
            .then((newItem) => setItems((prev) => [...prev, newItem]));
    };

    const deleteTodo = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
        }).then(() =>
            setItems((prev) => prev.filter((item) => item.id !== id))
        );
    };

    const toggleComplete = (id) => {
        const todo = items.find((item) => item.id === id);

        fetch(`http://localhost:3000/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !todo.completed }),
        })
            .then((response) => response.json())
            .then((updated) => {
                setItems((prev) =>
                    prev.map((item) => (item.id === id ? updated : item))
                );
            });
    };

    const editTodo = (id, newTitle) => {
        const body = { title: newTitle };

        fetch(`http://localhost:3000/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((updatedTodo) => {
                setItems((prev) =>
                    prev.map((item) => (item.id === id ? updatedTodo : item))
                );
            });
    };

    return (
        <TodoContext
            value={{
                items,
                isLoading,
                addTodo,
                deleteTodo,
                toggleComplete,
                editTodo,
            }}
        >
            {children}
        </TodoContext>
    );
};
