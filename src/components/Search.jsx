// components/Search.jsx

import React, { useState } from 'react';
import { searchCargo } from '../services/api';
import "../App.css"; 

function Search({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
// Debounce the search query to prevent excessive API calls while typing
useEffect(() => {
  const debounceTimer = setTimeout(() => {
    if (query.trim()) {
      handleSearch(query); // Call the search function after the debounce delay
    } else {
      onSearchResults([]); // Clear search results when query is empty
    }
  }, 500); // Debounce delay: 500ms

  return () => clearTimeout(debounceTimer); // Cleanup the timer on unmount or query change
}, [query, onSearchResults]); // Effect depends on the query and onSearchResults

const handleSearch = async (query) => {
  setIsLoading(true);
  setError('');
  try {
    const results = await searchCargo(query);
    if (results.length === 0) {
      setError('No results found');
    }
    onSearchResults(results);
  } catch (err) {
    setError('Error fetching search results');
  }
  setIsLoading(false);
};
return (
  <div className="search-container">
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search cargo by name or status"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query as user types
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
    {error && <p className="error">{error}</p>}
  </div>
);
}
export default Search;
