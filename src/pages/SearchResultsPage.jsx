import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../store/globalStore';

const SearchResultsPage = () => {
  const { storedBookSearchResults } = useGlobalStore();
  const { searchTerm } = useParams();

  useEffect(() => {
    // check if searchTerm.toLowerCase().trim() is stored in searchResultsObject
    console.log("checking if searchTerm in searchResults object");

    if (storedBookSearchResults[searchTerm]) console.log("true: ", storedBookSearchResults[searchTerm]);

    console.log("searchTerm: ", searchTerm);
    console.log("bookSearchResults: ", storedBookSearchResults);
    // eslint-disable-next-line
  }, [searchTerm]); 
  

  return (
    <div>SearchResultsPage</div>
  );
}

export default SearchResultsPage;
