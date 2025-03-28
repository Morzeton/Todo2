import styles from "../App.module.css";
import TodoItem from "./TodoItem";

function TodoList({ items, isLoading, onToggleComplete, onDelete, onEdit }) {
    if (isLoading) {
        return <div className={styles.loader}>Загрузка...</div>;
    }

    if (items.length === 0) {
        return <p>Задачи не найдены</p>;
    }

    return (
        <div className={styles.todoList}>
            {items.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}

export default TodoList;
