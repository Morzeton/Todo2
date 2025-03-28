import styles from "../App.module.css";

function TodoSearch({ onSearch, isSorting, toggleSort }) {
    const handleChange = (e) => onSearch(e.target.value);

    return (
        <div className={styles.todoSearch}>
            <input
                type="text"
                placeholder="Поиск задач"
                onChange={handleChange}
                className={styles.searchInput}
            />
            <button onClick={toggleSort} className={styles.sortButton}>
                {isSorting ? "Отменить сортировку" : "Сортировать по алфавиту"}
            </button>
        </div>
    );
}

export default TodoSearch;
