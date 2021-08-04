import { memo } from 'react';

type Product = {
  product: {
    id: number;
    price: number;
    title: string;
  };
};

function ProductItemComponent({ product }: Product) {
  return (
    <article>
      <h4>{product.title}</h4>
      <p>
        <strong>Price: </strong>
        {product.price}
      </p>
    </article>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);

/**
 * MEMO best use cases
 * 1. Pure functional components (no state inside)
 * 2. Components rendered too often
 * 3. Re-rendered with the same prop values
 * 4. Medium to large components
 **/
