import { useApolloClient, gql } from '@apollo/client';
import styles from './CartItem.module.css';
import { currenciesMap } from '../../constants';

const CartItem = ({ id, currency }) => {
  const client = useApolloClient();
  const { title, price, image_url } = client.readFragment({
    id: `Product:${id}`, // The value of the to-do item's unique identifier
    fragment: gql`
      fragment MyTodo on Product {
        id,
        price(currency: ${currency})
        title
        image_url
      }
    `,
  });

  return (
    <article className={styles.wrapper}>
      <p>{title}</p>
      <p>
        <span
          dangerouslySetInnerHTML={{ __html: currenciesMap[currency] }}
        ></span>
        {price}
      </p>
      <img className={styles.image} src={image_url} alt={title} />
    </article>
  );
};

export default CartItem;
