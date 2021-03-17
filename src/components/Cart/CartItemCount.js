const CartItemCount = ({ count, increment, decrement }) => {
  return (
    <section>
      <button onClick={decrement} disabled={count === 0}>
        -
      </button>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </section>
  );
};
