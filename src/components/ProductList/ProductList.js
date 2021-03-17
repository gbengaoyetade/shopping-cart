// import { useEffect, useReducer } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ProductItem } from '../ProductItem';
import styles from './ProductList.module.css';

const getProductsQuery = (currency) => {
  return gql`
    query {
      products {
        id
        price(currency: ${currency})
        title
        image_url
      }
    }
  `;
};

const ProductList = ({ currency }) => {
  const { loading, error, data } = useQuery(getProductsQuery(currency));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <main className={styles['products-wrapper']}>
      {data.products.map((product) => (
        <ProductItem {...product} />
      ))}
    </main>
  );
};

export { ProductList };
