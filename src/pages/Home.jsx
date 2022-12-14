import React, {useEffect} from 'react';
import { Stack, Box, Typography, Divider } from '@mui/material';

import { HorizontalScrollbar, HomeBook } from "../components/books";
import { BookLists } from '../utils/testObject';

const Home = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth"});
  }, []);

  return (
    <Stack id="good_books_home_page"
      width="100vw" height="auto" display="flex" alignItems="center"
      marginTop="150px"
    >
      <Stack sx={{ width: "100%", maxWidth: "1740px", margin: "auto", height: "auto" }}>
        {BookLists.map((genre) => (
          <Stack key={genre.id} width="100%" marginBottom="50px" display="flex" alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%"
              marginTop="20px"
              sx={{ paddingLeft: { xs: "0", md: "55px"}}}
            >
              <Typography fontSize="20px" color="#382110" marginBottom="8px"
                sx={{ marginLeft: { xs: "10px", md: "0"}}}
              >
                {genre.name}
              </Typography>

              <Divider component="li" style={{ listStyle: "none", borderColor: "black", width: "100%", maxWidth: "500px" }} />
            </Box>

            <HorizontalScrollbar>
              {genre.preview.map((book, idx) => (
                <HomeBook itemId={`${book.title}-${idx}`} key={`${book.title}-${idx}`} book={book} />
              ))}
            </HorizontalScrollbar>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Home;
