import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import useGlobalStore from '../../store/globalStore';
import { incrementReadingChallange, decrementReadingChallange } from '../../utils';

const ProfileSection = () => {
  const { userDetails, user } = useGlobalStore();
  const [currentYear] = useState(new Date().getFullYear());
  const [val, setVal] = useState(userDetails?.readingChallange || 0);

  const {id} = useParams();

  // useEffect(() => {
  //   if (picture === userDetails?.image || user?._id !== id) return;

  //   updateUserImage(picture, id);
  // }, [picture]);

  const handleIncrement = async () => {
    console.log("incrementing");
    setVal((prev) => prev + 1);

    const success = await incrementReadingChallange(id);

    if (!success) {
      setVal((prev) => prev - 1);
    }

  }

  const handleDecrement = async () => {
    console.log("decrementing");
    if (val < 1) return;
    console.log("decrementing 2");

    setVal((prev) => prev - 1);

    const success = await decrementReadingChallange(id);

    if (!success) {
      setVal(prev => prev + 1);
    }
  }
  
  return (
    <Stack
      id="profile_section"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
          <img 
            alt="profile"
            src={userDetails?.image ? userDetails.image : "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"}
            style={{
              borderRadius: '100%',
              height: '140px',
              width: '140px'
            }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // to prevent looping
              currentTarget.src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
            }}
          />
      </Box>

      <Typography fontSize={20} >
        {userDetails?.userName}
      </Typography>

      <Stack marginTop={8}>
        <Typography
          fontSize={30}
        >
          I want to read
        </Typography>
        
        <Stack
          direction="row"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize={40}
        >
          {user?._id === id ? (
            <Typography 
              onClick={handleDecrement}
              sx={{ 
                color: '#382110',
                marginRight: 3,
                fontSize: '30px',
                padding: 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <BsChevronDown />
            </Typography>
          ) : (
            null
          )}

          <span style={{ cursor: 'default' }}>{val}</span>

          {user?._id === id ? (
            <Typography 
              onClick={handleIncrement}
              sx={{ 
                color: '#382110',
                marginLeft: 3,
                fontSize: '30px',
                padding: 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <BsChevronUp />
            </Typography> 
          ) : null}
          
        </Stack>
        

        <Typography fontSize={30}>
          books in {currentYear}
        </Typography>
      </Stack>
      
    </Stack>
  );
}

export default ProfileSection;
