import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import { AddProductToWishlistProps } from './AddProductToWishlist';

// import { AddProductToWishlist } from './AddProductToWishlist';
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  async () => {
    return import('./AddProductToWishlist').then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    loading: () => <div>Carregando...</div>,
  }
);

type Product = {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
};

function ProductItemComponent({ product, onAddToWishlist }: Product) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <article>
      <h4>{product.title}</h4>
      <p>
        <strong>Price: </strong>
        {product.priceFormatted}
      </p>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Add to favorites
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
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
