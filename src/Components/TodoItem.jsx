import { useState } from "react";
import styles from "../App.module.css";

function TodoItem({ todo, onToggleComplete, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleSave = () => {
        if (editedTitle.trim()) {
            onEdit(todo.id, editedTitle);
            setIsEditing(false);
        }
    };

    return (
        <div className={styles.todo}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
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
                    onClick={() => onDelete(todo.id)}
                    className={styles.deleteButton}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
