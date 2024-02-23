import styles from './LoadBoard.module.css';

export const LoadBoard = () => {
  return (
    <div className={styles.loadBoardModalContent}>
      <form className={styles.loadForm}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
        <label htmlFor="boards">Load board as</label>
        <select id="boards">
          <option>Board 1</option>
          <option>Board 2</option>
          <option>Board 3</option>
        </select>
        <button type="submit" className={styles.button}>
          CLEAR CURRENT TABLE AND LOAD
        </button>
        <button type="submit" className={styles.button}>
          ADD TO CURRENT TABLE
        </button>
      </form>
    </div>
  );
};
