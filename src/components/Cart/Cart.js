import { useContext } from 'react';
import { currenciesMap } from '../../constants';
import styles from './Cart.module.css';
import { AppContext } from '../../store';
import CartItem from './CartItem';
import { CLOSE_CART } from '../../constants';

const Cart = ({ currency, setCurrency }) => {
  const { state, dispatch } = useContext(AppContext);

  const renderOptions = () => {
    return Object.keys(currenciesMap).map((value) => (
      <option
        key={value}
        value={value}
        defaultValue={value === currency ? value : ''}
      >
        {value}
      </option>
    ));
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const renderCartItems = () => {
    return Object.entries(state.cart.items).map((item) => {
      return (
        <CartItem
          key={item[0]}
          id={item[0]}
          count={item[1]}
          currency={currency}
        />
      );
    });
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
      <section className={styles.wrapper}>
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
            >
              {renderOptions()}
            </select>
          </form>
        </header>

        {renderCartItems()}
      </section>
    </div>
  );
};

export default Cart;
