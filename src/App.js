import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ProductList } from './components/ProductList';
import styles from './App.module.css';
import { Cart } from './components/Cart';
import loadingGif from './assets/images/loading.gif';

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

  if (loading)
    return (
      <div className={styles['loading-wrapper']}>
        <img src={loadingGif} alt='Loading gif' />
      </div>
    );
  if (error) return <p>Error</p>;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>All Products</h1>
        <p>A 360&#730; look at Lumin</p>
      </header>
      <Cart currency={currency} setCurrency={setCurrency} />
      <ProductList products={data.products} currency={currency} />
    </div>
  );
};

export default App;
