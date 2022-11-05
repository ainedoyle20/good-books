import React, { useState } from 'react';
import { Stack } from '@mui/material';

import { BookStatus, ChooseShelf } from "./"

const HomeBook = ({ book }) => {
  const [showShelves, setShowShelves] = useState(false);
  return (
    <Stack
      height="300px" marginTop="0" width="220px"
      display="flex" alignItems="flex-end" marginX="20px"
      position="relative"
    >
      <BookStatus setShowShelves={setShowShelves} />
      
      <img src={book.imageURL} alt="book cover" style={{ height: "90%", width: "100%" }} />

      {showShelves ? (
        <ChooseShelf setShowShelves={setShowShelves} title={book.title} />
      ) : null}

    </Stack>
  );
}

export default HomeBook;
