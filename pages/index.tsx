import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    const response = await fetch(`http://localhost:3333/products?q=${term}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const products = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      priceFormatted: formatter.format(product.price),
    }));

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ data: products, totalPrice });
  }

  const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <main>
      <section className="search-form">
        <h1>Search products</h1>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </section>

      {results && (
        <SearchResults
          results={results.data}
          totalPrice={results.totalPrice}
          onAddToWishlist={addToWishList}
        />
      )}
    </main>
  );
}
