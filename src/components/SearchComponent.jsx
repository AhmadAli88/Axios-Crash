import React from 'react'

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    useEffect(() => {
      const controller = new AbortController();
  
      const searchData = async () => {
        try {
          const response = await axios.get(
            `https://api.example.com/search?q=${query}`,
            {
              signal: controller.signal
            }
          );
          setResults(response.data);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request cancelled');
          } else {
            console.error('Search failed:', error);
          }
        }
      };
  
      if (query) {
        searchData();
      }
  
      return () => controller.abort();
    }, [query]);
  };

export default SearchComponent