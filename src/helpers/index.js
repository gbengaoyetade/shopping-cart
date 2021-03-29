import { gql } from '@apollo/client';

export const readProduct = (client) => {
  const data = client.readQuery({
    query: gql`
      query ReadProduct {
        products {
          id
          priceCache
          title
          image_url
        }
      }
    `,
  });

  return data;
};

export const writePricesToCache = (client, products) => {
  products.forEach(({ id, price }) => {
    client.writeQuery({
      query: gql`
        query WritePriceCache($id: Int!) {
          product(id: $id) {
            id
            priceCache
          }
        }
      `,
      data: {
        product: {
          __typename: 'Product',
          id,
          priceCache: price,
        },
      },
      variables: {
        id,
      },
    });
  });
};
