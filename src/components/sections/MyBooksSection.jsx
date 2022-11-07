import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md"

import { BookDetailsObject } from '../../utils/testObject';

const MyBooksSection = () => {
  const [acitiveShelf, setAcitiveShelf] = useState(1);
  return (
    <Stack 
      id="bookshelves_section"
      width="100vw" height="100vh" display="flex"
      padding="150px 80px"
    >
      <Box width="100%" borderBottom="2px solid #382110" paddingBottom="10px" marginBottom="50px">
        <Typography fontSize="30px">
          My Books
        </Typography>
      </Box>

      <Box display="flex" width="100%">
        <Stack marginRight="50px" padding="0 10px" width="300px" sx={{ cursor: "default" }}>
          <Typography variant="h5" marginBottom="10px">
            Bookshelves
          </Typography>
          
          <Typography fontSize="18px" marginBottom="5px">
            All &#10088; 24 &#10089;
          </Typography>
          <Typography fontWeight={acitiveShelf === 1 ? "bold" : "400"} fontSize="18px" marginBottom="5px" sx={{ cursor: "pointer" }}
            onClick={() => setAcitiveShelf(1)}
          >
            Want to Read &#10088; 8 &#10089;
          </Typography>
          <Typography fontWeight={acitiveShelf === 2 ? "bold" : "400"} fontSize="18px" marginBottom="5px" sx={{ cursor: "pointer" }}
            onClick={() => setAcitiveShelf(2)}
          >
            Currently Reading &#10088; 8 &#10089;
          </Typography>
          <Typography fontWeight={acitiveShelf === 3 ? "bold" : "400"} fontSize="18px" marginBottom="5px" sx={{ cursor: "pointer" }}
            onClick={() => setAcitiveShelf(3)}
          >
            Read &#10088; 8 &#10089;
          </Typography>
        </Stack>

        <Stack display="flex" alignItems="center">
          <Stack direction="row" width="1050px" marginBottom="30px" borderBottom='1px solid #382110'>
            <Typography fontSize="20px" width="160px" display="flex" justifyContent="center">
              cover
            </Typography>
            <Typography fontSize="20px" width="160px" display="flex" justifyContent="center">
              tite
            </Typography>
            <Typography fontSize="20px" width="160px" display="flex" justifyContent="center">
              author
            </Typography>
            <Typography fontSize="20px" width="200px" display="flex" justifyContent="center">
              avg. rating
            </Typography>
            <Typography fontSize="20px" width="160px" display="flex" justifyContent="center">
              shelf
            </Typography>
            <Typography fontSize="20px" width="160px" display="flex" justifyContent="center">
              date read
            </Typography>
          </Stack>

          <Stack width="1050px" height="700px" borderBottom="1px solid rgba(1, 1, 1, 0.1)"
            sx={{ overflowY: "scroll", "&::-webkit-scrollbar": { width: 0 } }}
          >
            <Stack direction="row" height="160px" width="100%" borderBottom="1px solid #382110" marginBottom="20px" sx={{ cursor: "default"}}>
              <Box height="100%" width="160px" padding="0 15px" paddingBottom="10px">
                <img alt="book cover" src={BookDetailsObject.cover} width="100%" height="100%" />
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.name}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.authors[0]}
                </Typography>
              </Box>
              <Box height="100%" width="200px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.rating}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>Want to Read</Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  05/11/2022
                </Typography>
              </Box>
              <Box height="100%" width="50px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography fontSize="25px" sx={{ cursor: "pointer" }}>
                  <MdOutlineCancel />
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" height="160px" borderBottom="1px solid #382110" marginBottom="20px" sx={{ cursor: "default"}}>
              <Box height="100%" width="160px" padding="0 15px" paddingBottom="10px">
                <img alt="book cover" src={BookDetailsObject.cover} width="100%" height="100%" />
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.name}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.authors[0]}
                </Typography>
              </Box>
              <Box height="100%" width="200px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.rating}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>Want to Read</Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  05/11/2022
                </Typography>
              </Box>
              <Box height="100%" width="50px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography fontSize="25px" sx={{ cursor: "pointer" }}>
                  <MdOutlineCancel />
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" height="160px" borderBottom="1px solid #382110" marginBottom="20px" sx={{ cursor: "default"}}>
              <Box height="100%" width="160px" padding="0 15px" paddingBottom="10px">
                <img alt="book cover" src={BookDetailsObject.cover} width="100%" height="100%" />
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.name}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.authors[0]}
                </Typography>
              </Box>
              <Box height="100%" width="200px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.rating}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>Want to Read</Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  05/11/2022
                </Typography>
              </Box>
              <Box height="100%" width="50px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography fontSize="25px" sx={{ cursor: "pointer" }}>
                  <MdOutlineCancel />
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" height="160px" borderBottom="1px solid #382110" marginBottom="20px" sx={{ cursor: "default"}}>
              <Box height="100%" width="160px" padding="0 15px" paddingBottom="10px">
                <img alt="book cover" src={BookDetailsObject.cover} width="100%" height="100%" />
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.name}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.authors[0]}
                </Typography>
              </Box>
              <Box height="100%" width="200px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.rating}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>Want to Read</Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  05/11/2022
                </Typography>
              </Box>
              <Box height="100%" width="50px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography fontSize="25px" sx={{ cursor: "pointer" }}>
                  <MdOutlineCancel />
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" height="160px" borderBottom="1px solid #382110" marginBottom="20px" sx={{ cursor: "default"}}>
              <Box height="100%" width="160px" padding="0 15px" paddingBottom="10px">
                <img alt="book cover" src={BookDetailsObject.cover} width="100%" height="100%" />
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.name}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.authors[0]}
                </Typography>
              </Box>
              <Box height="100%" width="200px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  {BookDetailsObject.rating}
                </Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>Want to Read</Typography>
              </Box>
              <Box height="100%" width="160px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography>
                  05/11/2022
                </Typography>
              </Box>
              <Box height="100%" width="50px" paddingTop="10px" display="flex" justifyContent="center">
                <Typography fontSize="25px" sx={{ cursor: "pointer" }}>
                  <MdOutlineCancel />
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        
      </Box>
    </Stack>
  );
}

export default MyBooksSection;
