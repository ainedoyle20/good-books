import { Box } from '@mui/material';
import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const Stars = ({ stars }) => {
  if (!stars) {
    return null;
  }

  return (
    <Box height="100%" marginLeft="10px" display="flex" alignItems="center" fontSize="25px">
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
