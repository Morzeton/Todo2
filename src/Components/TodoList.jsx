import { useContext } from "react";
import TodoContext from "../TodoContext";
import TodoItem from "./TodoItem";
import styles from "../App.module.css";

function TodoList() {
    const { items, isLoading } = useContext(TodoContext);

    if (isLoading) {
        return <div className={styles.loader}>Загрузка...</div>;
    }

    if (items.length === 0) {
        return <p>Задачи не найдены</p>;
    }

    return (
        <div className={styles.todoList}>
            {items.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}

export default TodoList;
