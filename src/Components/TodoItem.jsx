import { useContext, useState } from "react";
import TodoContext from "../TodoContext";
import styles from "../App.module.css"; // если нужны стили

function TodoItem({ todo }) {
    const { toggleComplete, deleteTodo, editTodo } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleSave = () => {
        if (editedTitle.trim()) {
            editTodo(todo.id, editedTitle);
            setIsEditing(false);
        }
    };

    return (
        <div className={styles.todo}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />
            {isEditing ? (
                <div className={styles.editContainer}>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className={styles.editInput}
                    />
                </div>
            ) : (
                <div className={styles.viewContainer}>
                    <span className={todo.completed ? styles.completed : ""}>
                        {todo.title}
                    </span>
                </div>
            )}
            <div className={styles.buttonsContainer}>
                {isEditing ? (
                    <button onClick={handleSave} className={styles.saveButton}>
                        Сохранить
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className={styles.editButton}
                    >
                        Редактировать
                    </button>
                )}
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className={styles.deleteButton}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
