import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import useGlobalStore from '../store/globalStore';
import { BookDetails } from '../components/reusable/books';
import { searchBookByName } from '../utils/rapidApi';
import Loader from '../components/reusable/Loader';

const SearchResultsPage = () => {
  const { storedBookSearchResults, updateStoredBookSearchResults } = useGlobalStore();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchTerm } = useParams();

  useEffect(() => {
    setIsLoading(true);

    if (storedBookSearchResults[searchTerm]) {
      console.log("search term stored");
      setSearchResults(storedBookSearchResults[searchTerm]);
      setIsLoading(false);
    } else {
      const getRapidAPIResults = async (bookName) => {
        const apiResults = await searchBookByName(bookName);
        if (apiResults.length) updateStoredBookSearchResults(searchTerm, apiResults, storedBookSearchResults);
        setSearchResults(apiResults);
        setIsLoading(false);
      }

      getRapidAPIResults(searchTerm);
    }

    // eslint-disable-next-line
  }, [searchTerm]); 

  return (
    <Stack width="100vw" height={searchResults.length ? "auto" : "100vh"} display="flex" alignItems="center" paddingTop="150px" paddingBottom="150px">
      {isLoading ? (
        <Loader inScrollingContainer={true} />
      ) : (
        <>
          {searchResults.length ? (
            searchResults.map((bookDetails, idx) => (
              <BookDetails key={`${bookDetails.book_id}-${idx}`} bookDetails={bookDetails} inSearchResults={true} />
            ))
          ) : (
            <Typography>No Results</Typography>
          )}
        </> 
      )}
      
    </Stack>
  );
}

export default SearchResultsPage;
