import { Box } from '@mui/material';
import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const Stars = ({ stars, inMyBooks }) => {
  if (!stars) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center"
      marginLeft={inMyBooks ? "0" : "10px"}
      width={inMyBooks ? "100%" : "auto"}
      sx={{ fontSize: inMyBooks ? "15px" : { xs: "18px", md: "30px" }}}
    >
      {stars === 5 ? (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </>
      ) : stars >= 4 ? (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </>
      ) : stars >= 3 ? (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      ) : stars >= 2 ? (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      ) : (
        <>
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      )}
    </Box>
  );
}

export default Stars;
