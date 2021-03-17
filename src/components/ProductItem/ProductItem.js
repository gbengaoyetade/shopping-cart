import { useContext } from 'react';
import styles from './ProductItem.module.css';
import { ADD_TO_CART } from '../../constants';
import { AppContext } from '../../store';
import { Currency } from '../Currency';

const ProductItem = ({ image_url, id, title, price, currency }) => {
  const { dispatch } = useContext(AppContext);
  const handleClick = (id) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id },
    });
  };

  return (
    <section className={styles.wrapper}>
      <img className={styles.image} src={image_url} alt={title} />

      <div className={styles.wrapper}>
        <p className={styles.name}>{title}</p>
        <p className={styles.price}>
          From &nbsp;
          <Currency currency={currency} />
          {price}
        </p>
        <button className={styles.button} onClick={() => handleClick(id)}>
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export { ProductItem };
