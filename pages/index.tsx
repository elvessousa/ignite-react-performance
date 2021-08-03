import { FormEvent, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

export default function Home() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    const products = await fetch(`http://localhost:3333/products?q=${term}`);
    const searchResults = await products.json();

    setResults(searchResults);
  }

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

      {results && <SearchResults results={results} />}
    </main>
  );
}
