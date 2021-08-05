import { List, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from './ProductItem';

type SearchResultsProps = {
  totalPrice: number;
  results: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }[];
  onAddToWishlist: (id: number) => void;
};

export function SearchResults({
  totalPrice,
  results,
  onAddToWishlist,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          key={key}
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  };
  return (
    <section>
      <h2>Total price: {totalPrice}</h2>
      <div className="results">
        <List
          height={300}
          rowHeight={100}
          width={700}
          overscanRowCount={3}
          rowCount={results.length}
          rowRenderer={rowRenderer}
        />
      </div>
    </section>
  );
}

/**
 * useMemo best use cases
 * 1. Heavy calculations
 * 2. When repassing calculation data into child components
 **/
