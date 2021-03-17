import { useState } from 'react';
import { ProductList } from './components/ProductList';
import styles from './App.module.css';

const App = () => {
  const [currency, setCurrency] = useState('USD');

  return (
    <div className={styles.wrapper}>
      <ProductList currency={currency} />
    </div>
  );
};

export default App;
