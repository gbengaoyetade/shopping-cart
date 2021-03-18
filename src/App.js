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

  const renderProducts = () => {
    return (
      <>
        <Cart currency={currency} setCurrency={setCurrency} />
        <ProductList products={data.products} currency={currency} />
      </>
    );
  };

  const renderLoader = () => {
    return (
      <div className={styles['loading-wrapper']}>
        <img src={loadingGif} alt='Loading gif' />
      </div>
    );
  };

  const rendeError = () => (
    <div className={styles['loading-wrapper']}>
      <p className={styles.error}>
        There was an error fetching products. Please try again.
      </p>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>All Products</h1>
        <p>A 360&#730; look at Lumin</p>
      </header>
      {loading && renderLoader()}
      {data && renderProducts()}
      {error && rendeError()}
    </div>
  );
};

export default App;
