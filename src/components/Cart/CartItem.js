import { useContext } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import styles from './CartItem.module.css';
import {
  currenciesMap,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
} from '../../constants';
import CartItemCount from './CartItemCount';
import { AppContext } from '../../store';

const CartItem = ({ id, count, currency }) => {
  const client = useApolloClient();
  const { dispatch } = useContext(AppContext);

  const { title, price, image_url } = client.readFragment({
    id: `Product:${id}`,
    fragment: gql`
      fragment MyTodo on Product {
        id,
        price(currency: ${currency})
        title
        image_url
      }
    `,
  });

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
      <p>{title}</p>
      <button onClick={handleItemRemove}>x</button>
      <p>
        <span
          dangerouslySetInnerHTML={{ __html: currenciesMap[currency] }}
        ></span>
        {price}
      </p>
      <img className={styles.image} src={image_url} alt={title} />
      <CartItemCount
        count={count}
        increment={increment}
        decrement={decrement}
      />
    </article>
  );
};

export default CartItem;
