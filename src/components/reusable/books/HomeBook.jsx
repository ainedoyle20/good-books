import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

import { BookStatus, ChooseShelf } from "./"

const HomeBook = ({ book }) => {
  const [showShelves, setShowShelves] = useState(false);

  const navigate = useNavigate();

  return (
    <Stack
      marginTop="0"
      display="flex" alignItems="flex-end" marginLeft="10px" marginRight="30px"
      position="relative"
    >
      <BookStatus setShowShelves={setShowShelves} />
      
      <img src={book.imageURL} alt="book cover" width="290px" height="400px" 
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/bookdetails/${book?.book_id}`)}
      />

      {showShelves ? (
        <ChooseShelf setShowShelves={setShowShelves} bookDetails={book} />
      ) : null}

    </Stack>
  );
}

export default HomeBook;
