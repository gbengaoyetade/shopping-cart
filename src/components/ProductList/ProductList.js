import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { ProductItem } from '../ProductItem';
import styles from './ProductList.module.css';
import { AppContext } from '../../store';
import { readProduct } from '../../helpers';
import { Cart } from '../Cart';

const ProductList = ({ products }) => {
  const {
    state: { currency },
  } = useContext(AppContext);

  const client = useApolloClient();

  return (
    <main className={styles['products-wrapper']}>
      {products.map(({ id }) => {
        const data = readProduct(client, id);
        return <ProductItem key={id} {...data} currency={currency} />;
      })}

      <Cart />
    </main>
  );
};

export { ProductList };
