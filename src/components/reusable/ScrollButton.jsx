import React, {useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollButton = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const handleScrollEventListener = () => {
    const position = window.pageYOffset;

    if (position > 100) {
      setShowScrollBtn(true);
    } else {
      setShowScrollBtn(false);
    }
  }

  useEffect(() => {
    console.log("in here");
    window.addEventListener("scroll", handleScrollEventListener)
  }, []);


  const handleScrollTopTop = () => {
    navigate("/profile");
    document.getElementById("profile_section").scrollIntoView({
      behavior: "smooth"
    });
  }

  if (!pathname.includes("/profile") || !showScrollBtn) {
    return null;
  }

  return (
    <Box height="100px" position="fixed" bottom="40px" right="40px" sx={{ display: "flex", alignItems: "end", cursor: "pointer"}}
      onClick={(e) => {
        e.stopPropagation();
        handleScrollTopTop();
      }}
    >
    
      <Typography color="#382110" fontSize={30} borderLeft="3px solid #382110" sx={{ rotate: "-90deg"}}>
        &#10132;
      </Typography>
    </Box>
  );
}

export default ScrollButton;
