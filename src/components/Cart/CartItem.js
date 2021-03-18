import { useContext } from 'react';
import styles from './CartItem.module.css';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
} from '../../constants';
import CartItemCount from './CartItemCount';
import { AppContext } from '../../store';
import { Currency } from '../Currency';

const CartItem = ({ id, count, currency, title, price, imageUrl }) => {
  const { dispatch } = useContext(AppContext);

  const handleItemRemove = () => {
    dispatch({ type: DELETE_FROM_CART, payload: { id } });
  };

  const increment = () => {
    dispatch({ type: ADD_TO_CART, payload: { id } });
  };

  const decrement = () => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  };

  return (
    <article className={styles.wrapper}>
      <div className={styles.justify}>
        <p className={styles.title}>{title}</p>
        <button className={styles.button} onClick={handleItemRemove}>
          x
        </button>
      </div>
      <div className={styles['image-wrapper']}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </div>
      <div className={`${styles.justify} ${styles.quantity}`}>
        <CartItemCount
          count={count}
          increment={increment}
          decrement={decrement}
        />
        <p>
          <Currency currency={currency} />
          {price}
        </p>
      </div>
    </article>
  );
};

export default CartItem;
