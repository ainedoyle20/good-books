import React, {useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';

const ScrollButton = () => {
  const { updateNavSection } = useGlobalStore();
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const handleScrollEventListener = () => {
    const position = window.pageYOffset;

    if (position > 1000) {
      setShowScrollBtn(true);
    } else {
      setShowScrollBtn(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEventListener)
  }, []);


  const handleScrollTopTop = () => {
    navigate("#profile_section");
    updateNavSection("profile_section");
    document.getElementById("profile_section").scrollIntoView({
      behavior: "smooth"
    });
  }

  if (!pathname.includes("/profile") || !showScrollBtn) {
    return null;
  }

  return (
    <Box height="100px" position="fixed" bottom="20px" right="20px" sx={{ display: "flex", alignItems: "end", cursor: "pointer"}}
      onClick={(e) => {
        e.stopPropagation();
        handleScrollTopTop();
      }}
    >
    
      <Typography color="#382110" borderLeft="3px solid #382110" 
        sx={{ 
          rotate: "-90deg",
          fontSize: {xs: "20px", md: "28px"}
        }}
      >
        &#10132;
      </Typography>
    </Box>
  );
}

export default ScrollButton;
