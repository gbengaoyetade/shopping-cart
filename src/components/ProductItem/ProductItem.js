import styles from './ProductItem.module.css';
import { currenciesMap } from '../../constants';

const ProductItem = ({ image_url, id, title, price }) => {
  const handleClick = () => {};

  return (
    <section className={styles.wrapper}>
      <img className={styles.image} src={image_url} alt={title} />

      <div className={styles.wrapper}>
        <p className={styles.name}>{title}</p>
        <p className={styles.price}>
          From &nbsp;
          <span
            dangerouslySetInnerHTML={{ __html: currenciesMap['USD'] }}
          ></span>
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
