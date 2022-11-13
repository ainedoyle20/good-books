import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible} = useContext(VisibilityContext);

  return (
    <Box onClick={() => {if (!isFirstItemVisible) { scrollPrev() }}}
      height="450px" display="flex" alignItems="center" paddingLeft="2px"
      sx={{ marginRight: { xs: "0", md: "20px"}, width: { xs: "auto", md: "38px"}}}
    >
      <Typography sx={{ display: { xs: "block", "2xl": "none"}, fontSize: { xs: "25px", md: "35px"} }}>
        <MdArrowBackIos style={{ cursor: "pointer" }} />
      </Typography>
    </Box>
  );
}

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);

  return (
    <Box onClick={() => {if (!isLastItemVisible) { scrollNext() }}}
      height="450px" display="flex" alignItems="center"
      sx={{ marginLeft: { xs: "0", md: "20px"}, width: { xs: "auto", md: "38px"}}}
    >
      <Typography sx={{ display: { xs: "block", "2xl": "none"}, fontSize: { xs: "25px", md: "35px"} }}>
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
