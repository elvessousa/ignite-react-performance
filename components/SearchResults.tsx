import { useMemo } from 'react';
import { ProductItem } from './ProductItem';

type SearchResultsProps = {
  results: {
    id: number;
    price: number;
    title: string;
  }[];
};

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <section>
      <h2>Total price: {totalPrice}</h2>
      <div className="results">
        {results.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

/**
 * useMemo best use cases
 * 1. Heavy calculations
 * 2. When repassing calculation data into child components
 **/
