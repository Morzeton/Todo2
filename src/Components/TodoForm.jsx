import { useState } from "react";
import styles from "../App.module.css";

function TodoForm({ onAddTodo, isLoading }) {
    const [newTitle, setNewTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTodo(newTitle);
        setNewTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.todoForm}>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Введите задачу"
                className={styles.input}
            />
            <button
                type="submit"
                disabled={isLoading || !newTitle.trim()}
                className={styles.button}
            >
                Добавить
            </button>
        </form>
    );
}

export default TodoForm;
