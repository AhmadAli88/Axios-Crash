import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const searchData = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${query}`,
          { signal: controller.signal }
        );
        setResults(response.data.query.search);
        setError(null);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled');
        } else {
          setError('Search failed, please try again.');
          console.error('Search failed:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceSearch = setTimeout(() => {
      searchData();
    }, 500);

    return () => {
      clearTimeout(debounceSearch);
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Wikipedia..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {results.map((result) => (
          <li key={result.pageid}>
            <a
              href={`https://en.wikipedia.org/?curid=${result.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.title}
            </a>
            <p>{result.snippet.replace(/<\/?[^>]+(>|$)/g, "")}</p> {/* Clean up HTML tags in snippet */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
