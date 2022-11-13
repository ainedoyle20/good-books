import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box } from '@mui/material';

import { BookStatus, ChooseShelf } from "./"

const HomeBook = ({ book }) => {
  const [showShelves, setShowShelves] = useState(false);

  const navigate = useNavigate();

  return (
    <Stack
      display="flex" alignItems="flex-end" marginLeft="10px" marginRight="30px"
      position="relative"
      sx={{ marginTop: { xs: "30px", md: "0"}}}
    >
      <BookStatus setShowShelves={setShowShelves} />
      
      <Box
        sx={{ height: { xs: "350px", md: "400px"}, width: { xs: "240px", md: "290px"}}}
      >
        <img src={book.imageURL} alt="book cover" width="100%" height="100%" 
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/bookdetails/${book?.book_id}`)}
        />
      </Box>
      

      {showShelves ? (
        <ChooseShelf setShowShelves={setShowShelves} bookDetails={book} />
      ) : null}

    </Stack>
  );
}

export default HomeBook;
// height: "400px", width: "290px"