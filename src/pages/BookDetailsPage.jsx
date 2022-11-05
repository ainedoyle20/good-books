import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';

import { BookDetails } from "../utils/testObject";
import { BookStatus, ChooseShelf, AmazonButton } from "../components/reusable/books";

const BookDetailsPage = () => {
  const [showShelves, setShowShelves] = useState(false);
  const [showAmazonChoices, setShowAmazonChoices] = useState(false);
  const [showAllSynopsis, setShowAllSynopsis] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // check if book details stored
    // getBookById api call if not stored
    console.log("checking if stored...", id);
  }, []);

  return (
    <Stack width="100vw" height="100vh" display="flex" alignItems="center" paddingTop="150px">
      <Box display="flex" width="70%">
        <Stack  width="35%" display="flex" alignItems="center">
          <img alt="book cover" src={BookDetails.cover} height="400px" width="300px" 
            style={{ marginBottom: "40px"}}
          />

          <Box position="relative" width="400px">
            <BookStatus setShowShelves={setShowShelves} inBookDetails={true} />

            {showShelves ? (
              <ChooseShelf setShowShelves={setShowShelves} />
            ) : null}

            <AmazonButton setShowAmazonChoices={setShowAmazonChoices} />
          </Box>

        </Stack>

        <Stack width="65%">
          <Typography variant='h3'>
            {BookDetails.name}
          </Typography>

          <Typography variant='h5' marginBottom="10px">
            {BookDetails.authors[0]}
          </Typography>

          <Typography variant='h5' marginBottom="30px">
            {BookDetails.rating}
          </Typography>

          <Stack width="90%" height={showAllSynopsis ? "auto" : "250px"}
            borderBottom="1px solid rgba(1, 1, 1, 0.1)" sx={{ overflow: "hidden"}}>
            {BookDetails.synopsis.split(".").map((sentence, idx) => (
              <Typography key={`${sentence}-${idx}`} marginBottom="10px" fontSize="18px">
                {sentence}
              </Typography>
            ))}
          </Stack>
          <Typography width="90%" 
            paddingTop="10px" paddingLeft="5px"
            sx={{cursor: "pointer"}} 
            onClick={() => showAllSynopsis ? setShowAllSynopsis(false) : setShowAllSynopsis(true)}
          >
            {showAllSynopsis ? "Show less" : "Show more"}
          </Typography>

          <Typography marginTop="20px" fontSize="22px">
            {BookDetails.pages} pages
          </Typography>
          <Typography marginTop="10px" fontSize="22px">
            {BookDetails.published_date}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default BookDetailsPage;
