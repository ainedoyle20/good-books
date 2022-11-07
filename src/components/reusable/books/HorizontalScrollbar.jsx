import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible} = useContext(VisibilityContext);

  return (
    <Box onClick={() => {if (!isFirstItemVisible) { scrollPrev() }}}
      height="450px" width="38px" display="flex" alignItems="center" marginRight="20px"
    >
      <Typography fontSize="35px" sx={{ display: { xs: "block", "2xl": "none"} }}>
        <MdArrowBackIos style={{ cursor: "pointer" }} />
      </Typography>
    </Box>
  );
}

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);

  return (
    <Box onClick={() => {if (!isLastItemVisible) { scrollNext() }}}
      height="450px" width="38px" display="flex" alignItems="center" marginLeft="20px"
    >
      <Typography fontSize="35px" sx={{ display: { xs: "block", "2xl": "none"} }}>
        <MdArrowForwardIos style={{ cursor: "pointer" }} />
      </Typography>
    </Box>
  );
};

const HorizontalScrollbar = ({ children }) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {children}
    </ScrollMenu>
  );
}

export default HorizontalScrollbar;
