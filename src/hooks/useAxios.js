import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, options);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// // Usage of custom hook
// const MyComponent = () => {
//   const { data, loading, error } = useAxios('https://api.example.com/data');
//   // Use the data, loading, and error states
// };