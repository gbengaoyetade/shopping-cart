import { ProductItem } from '../ProductItem';
import styles from './ProductList.module.css';

const products = [
  {
    title: 'No-Nonsense Charcoal Cleanser',
    image_url:
      'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/charcoal-cleanser.png',
    price: 16,
  },
  {
    title: 'Classic Maintenance',
    image_url:
      'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/classic-maintenance.png',
    price: 60,
  },
  {
    title: 'Eye Depuffer',
    image_url:
      'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/deflator.png',
    price: 12,
  },

  {
    title: 'No-Nonsense Charcoal Cleanser',
    image_url:
      'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/charcoal-cleanser.png',
    price: 16,
  },
  {
    title: 'Classic Maintenance',
    image_url:
      'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/classic-maintenance.png',
    price: 60,
  },
  {
    title: 'Eye Depuffer',
    image_url:
      'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/deflator.png',
    price: 12,
  },
];

const ProductList = () => {
  return (
    <main className={styles['products-wrapper']}>
      {products.map((product) => (
        <ProductItem {...product} />
      ))}
    </main>
  );
};

export { ProductList };
