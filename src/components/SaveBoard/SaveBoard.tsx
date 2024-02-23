import styles from './SaveBoard.module.css';

export const SaveBoard = () => {
  return (
    <div className={styles.saveBoardModalContent}>
      <form className={styles.saveForm}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
        <label htmlFor="name">Save board as</label>
        <input id="name" />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
        <button type="submit" className={styles.button}>
          SAVE
        </button>
      </form>
      <form className={styles.loadForm}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
        <label htmlFor="boards">Delete board as</label>
        <select id="boards">
          <option>Board 1</option>
          <option>Board 2</option>
          <option>Board 3</option>
        </select>
        <button type="submit" className={styles.button}>
          DELETE
        </button>
      </form>
    </div>
  );
};
