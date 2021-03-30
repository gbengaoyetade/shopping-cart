import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { ProductItem } from '../ProductItem';
import styles from './ProductList.module.css';
import { AppContext } from '../../store';
import { readProduct } from '../../helpers';
import { Cart } from '../Cart';

const ProductList = () => {
  const {
    state: { currency },
  } = useContext(AppContext);

  const client = useApolloClient();

  const { products } = readProduct(client);

  return (
    <main className={styles['products-wrapper']}>
      {products.map((product) => {
        return (
          <ProductItem
            key={`product_${product.id}`}
            {...product}
            currency={currency}
          />
        );
      })}

      <Cart />
    </main>
  );
};

export { ProductList };
