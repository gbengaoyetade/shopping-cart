import { useContext } from 'react';
import { OPEN_CART } from '../../constants';
import { AppContext } from '../../store';
import { ReactComponent as CartIcon } from '../../assets/images/cart.svg';
import styles from './Nav.module.css';

const Nav = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(AppContext);

  const handleClick = () => {
    dispatch({
      type: OPEN_CART,
    });
  };

  const getCartItemCount = () => {
    const count = Object.values(cart.items).reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
    return count;
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.button} onClick={handleClick}>
        <CartIcon />
        <sup> {getCartItemCount()} </sup>
      </button>
    </nav>
  );
};

export default Nav;
