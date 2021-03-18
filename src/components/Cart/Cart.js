import { useContext } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { currenciesMap } from '../../constants';
import styles from './Cart.module.css';
import { AppContext } from '../../store';
import CartItem from './CartItem';
import { CLOSE_CART } from '../../constants';
import { Currency } from '../Currency';

const Cart = ({ currency, setCurrency }) => {
  const { state, dispatch } = useContext(AppContext);

  const client = useApolloClient();
  let subTotal = 0;

  const renderOptions = () => {
    return Object.keys(currenciesMap).map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const renderCartItems = () => {
    const cartItems = Object.entries(state.cart.items).map((item) => {
      const { title, price, image_url } = client.readFragment({
        id: `Product:${item[0]}`,
        fragment: gql`
          fragment MyTodo on Product {
            id,
            price(currency: ${currency})
            title
            image_url
          }
        `,
      });

      const currentItemPrice = price * item[1];
      subTotal += currentItemPrice;

      return (
        <CartItem
          key={item[0]}
          id={item[0]}
          count={item[1]}
          currency={currency}
          title={title}
          price={currentItemPrice}
          imageUrl={image_url}
        />
      );
    });

    return cartItems;
  };

  const handleCartClose = () => {
    dispatch({ type: CLOSE_CART });
  };

  return (
    <div className={`${state.cart.isOpen ? styles.open : styles.close} `}>
      <div
        className={`${styles.overlay} ${
          state.cart.isOpen ? styles.open : styles.close
        } `}
        onClick={handleCartClose}
      ></div>
      <section
        className={`${styles.wrapper} ${
          state.cart.isOpen ? styles.open : styles.close
        } `}
      >
        <header className={styles.header}>
          <div className={styles['header-desc']}>
            <button className={styles.button} onClick={handleCartClose}>
              &#60;
            </button>
            <p className={styles.title}>YOUR CART</p>
          </div>

          <form>
            <select
              className={styles.select}
              onChange={handleChange}
              name='currency'
              defaultValue={currency}
            >
              {renderOptions()}
            </select>
          </form>
        </header>
        <div className={styles['cart-items']}>{renderCartItems()}</div>

        <footer className={styles.footer}>
          <p className={styles.subTotal}>
            <span>Subtotal</span>{' '}
            <span>
              <Currency currency={currency} />
              {subTotal}
            </span>
          </p>
        </footer>
      </section>
    </div>
  );
};

export default Cart;
