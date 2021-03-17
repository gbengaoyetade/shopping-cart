import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ProductList } from './components/ProductList';
import styles from './App.module.css';
import { Cart } from './components/Cart';

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

const App = (props) => {
  const [currency, setCurrency] = useState('USD');

  const { loading, error, data } = useQuery(getProductsQuery(currency));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={styles.wrapper}>
      <Cart currency={currency} setCurrency={setCurrency} />
      <ProductList products={data.products} currency={currency} />
    </div>
  );
};

export default App;
