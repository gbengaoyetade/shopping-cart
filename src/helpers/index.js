import { gql } from '@apollo/client';

export const readProduct = (client, id) => {
  const { title, priceCache: price, image_url } = client.readFragment({
    id: `Product:${id}`,
    fragment: gql`
      fragment MyTodo on Product {
        priceCache
        title
        image_url
      }
    `,
  });

  return { title, price, image_url, id };
};

export const writePricesToCache = (client, products) => {
  products.forEach(({ id, price }) => {
    client.writeFragment({
      id: `Product:${id}`,
      fragment: gql`
        fragment product on Product {
          priceCache
        }
      `,
      data: {
        priceCache: price,
      },
    });
  });
};
