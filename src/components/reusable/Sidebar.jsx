import React, {useState} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { MdOutlineCancel, MdMenu } from "react-icons/md";

import useGlobalStore from '../../store/globalStore';

const Sidebar = ({ setShowSidebar, showSidebar }) => {
  const {updateNavSection, sidebarActiveOption} = useGlobalStore();
  const [sidebarOptions] = useState(['profile', 'bookshelves', 'friends', 'groups', 'discussions', 'messages']);

  return (
    <>
      {!showSidebar ? (
        // Menu
        <Typography position="fixed" sx={{ top: "70px", cursor: "pointer"}} 
          left="20px" fontSize="40px" zIndex={1000}
          onClick={() => setShowSidebar(true)}
        >
          <MdMenu/>
        </Typography>
      ) : (
        // Sidebar
        <Stack
          position="fixed" left='0' height='100%' width='250px'  paddingLeft="20px"
          backgroundColor='#f4f1ea'
          sx={{top: { xs: "120px", md: "60px"}, zIndex: 1000 }}
        >
          <Box width="100%" display="flex" justifyContent="flex-end" paddingRight="20px" paddingTop="30px">
            <Typography 
              fontSize="30px" sx={{ cursor: "pointer", ":hover": { fontSize: "31px" }}}
              display="flex" justifyContent="center" alignItems="center" height="50px" width="50px"
              onClick={() => setShowSidebar(false)}
            >
              <MdOutlineCancel  />
            </Typography>
          </Box>

          <Stack height="80%" width="100%" padding='0 10px' display="flex" justifyContent="center">
            {sidebarOptions.map((option, idx) => (
              <Typography 
                onClick={() => updateNavSection(`${option}_section`)} key={`${idx}${option}`}
                color="#382110" marginBottom="50px" fontSize="28px"
                sx={{ fontWeight: sidebarActiveOption === `${option}_section` ? '600' : '400', cursor: "pointer" }}
              >
                {option}
              </Typography>
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default Sidebar;
