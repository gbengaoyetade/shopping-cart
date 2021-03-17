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

const App = () => {
  const [currency, setCurrency] = useState('TRY');

  const { loading, error, data } = useQuery(getProductsQuery(currency));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.wrapper}>
      <Cart setCurrency={setCurrency} />
      <ProductList currency={currency} products={data.products} />
    </div>
  );
};

export default App;
