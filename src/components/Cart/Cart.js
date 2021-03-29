import { useContext, useEffect } from 'react';
import { useApolloClient, gql, useLazyQuery } from '@apollo/client';
import { currenciesMap } from '../../constants';
import styles from './Cart.module.css';
import { AppContext } from '../../store';
import { CartItem } from '../CartItem';
import { CLOSE_CART, SET_CURRENCY } from '../../constants';
import { Currency } from '../Currency';
import { readProduct, writePricesToCache } from '../../helpers';

const Cart = () => {
  const { state, dispatch } = useContext(AppContext);
  const { currency } = state;

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
    dispatch({
      type: SET_CURRENCY,
      payload: event.target.value,
    });
  };

  const query = gql`
    query Products($currency: Currency) {
      products {
        id
        price(currency: $currency)
      }
    }
  `;

  const [getProducts, { data }] = useLazyQuery(query, {
    variables: { currency: currency },
  });

  if (data) {
    writePricesToCache(client, data.products);
  }

  useEffect(() => {
    getProducts();
  }, [currency, getProducts]);
  const { products } = readProduct(client);

  const renderCartItems = () => {
    const cartItems = products.map(({ id, priceCache, title, image_url }) => {
      const cartItem = state.cart.items[id];
      if (cartItem) {
        const currentItemPrice = priceCache * cartItem;
        subTotal += currentItemPrice;

        return (
          <CartItem
            key={id}
            id={id}
            count={cartItem}
            currency={currency}
            title={title}
            price={currentItemPrice}
            imageUrl={image_url}
          />
        );
      }
      return null;
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
