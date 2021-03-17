import { ProductItem } from '../ProductItem';
import styles from './ProductList.module.css';

const ProductList = ({ currency, products }) => {
  return (
    <main className={styles['products-wrapper']}>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} currency={currency} />
      ))}
    </main>
  );
};

export { ProductList };
