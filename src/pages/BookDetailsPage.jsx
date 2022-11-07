import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import useGlobalStore from '../store/globalStore';
import { BookDetails } from "../components/reusable/books";
import { getBookById } from '../utils/rapidApi';
import Loader from '../components/reusable/Loader';

const BookDetailsPage = () => {
  const { getBookByIdResults, updateGetBookByIdResults } = useGlobalStore();
  const [bookDetailsObject, setBookDetailsObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    if (getBookByIdResults[id]) {
      console.log('IS STORED');
      setBookDetailsObject(getBookByIdResults[id]);
      setIsLoading(false);
    } else {
      const getRapidAPIBookById = async (id) => {
        const bookDetails = await getBookById(id);
        if (bookDetails && bookDetails.book_id) {
          updateGetBookByIdResults(id, bookDetails, getBookByIdResults);
          setBookDetailsObject(bookDetails);
          setIsLoading(false);
        }
      }

      getRapidAPIBookById(id);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Stack width="100vw" height="100vh" display="flex" alignItems="center" paddingTop="150px">
      {isLoading ? (
        <Loader inScrollingContainer={true} />
      ) : (
        <>
          {Object.values(bookDetailsObject).length ? (
            <BookDetails bookDetails={bookDetailsObject} />
          ) : (
            <Typography>No results</Typography>
          )}
        </>
      )}
    </Stack>
  );
}

export default BookDetailsPage;
