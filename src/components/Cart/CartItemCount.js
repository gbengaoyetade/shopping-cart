import styles from './CartItemCount.module.css';

const CartItemCount = ({ count, increment, decrement }) => {
  return (
    <section className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={decrement}
        disabled={count === 0}
      >
        -
      </button>
      <p>{count}</p>
      <button className={styles.button} onClick={increment}>
        +
      </button>
    </section>
  );
};

export default CartItemCount;
