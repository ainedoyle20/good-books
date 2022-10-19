import React, {useState} from 'react';
import { Stack, Typography } from '@mui/material';

import useGlobalStore from '../../store/globalStore';

const Sidebar = () => {
  const {updateSidebarActiveOption, sidebarActiveOption} = useGlobalStore();
  const [sidebarOptions] = useState(['profile', 'bookshelves', 'friends', 'groups', 'discussions', 'messages']);

  return (
    <Stack
      sx={{
        position: 'fixed',
        left: '0',
        top: {xs: '120px', md: '60px'},
        height: '100%',
        padding: '10px',
        backgroundColor: '#f4f1ea',
      }}
    >
      {sidebarOptions.map((option, idx) => (
        <a href={`#${option}_section`} onClick={() => updateSidebarActiveOption(`${option}_section`)} key={`${idx}${option}`}>
          <Typography 
            color="#382110"
            sx={{
              padding: '10px 8px',
              fontSize: '18px',
              textDecoration: sidebarActiveOption === `${option}_section` ? 'underline' : 'none',
            }}
          >
            {option}
          </Typography>
        </a>
      ))}
    </Stack>
  );
}

export default Sidebar;
