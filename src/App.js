import { gql, useQuery, useApolloClient } from '@apollo/client';
import { ProductList } from './components/ProductList';
import styles from './App.module.css';
import loadingGif from './assets/images/loading.gif';
import { writePricesToCache } from './helpers';
import { Nav } from './components/Nav';

const query = gql`
  query Products {
    products {
      id
      price(currency: USD)
      title
      image_url
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(query);
  const client = useApolloClient();

  if (data) {
    writePricesToCache(client, data.products);
  }

  const renderProducts = () => {
    return (
      <>
        <ProductList products={data.products} />
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
      <Nav />
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
