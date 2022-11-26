import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import useGlobalStore from '../../store/globalStore';
import { incrementReadingChallange, decrementReadingChallange, fetchUserDetails } from '../../utils';
import { Loader } from "../reusable/index"

const ProfileSection = () => {
  const { userDetails, user, addUserDetails } = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [val] = useState(userDetails?.readingChallange || 0);

  const {id} = useParams();

  const handleIncrement = async () => {
    if (!user?._id) return;
    setLoading(true);

    await incrementReadingChallange(id);

    await fetchUserDetails(user?._id, addUserDetails);

    window.location.reload();
  }

  const handleDecrement = async () => {
    if (val < 1 || !user?._id) return;
    setLoading(true);

    await decrementReadingChallange(id);

    await fetchUserDetails(user?._id, addUserDetails);

    window.location.reload();
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
          {loading ? (
            <Loader inScrollingContainer={true} />
          ) : (
            <>
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
            </>
          )}
        </Stack>
        

        <Typography fontSize={30}>
          books in {currentYear}
        </Typography>
      </Stack>
      
    </Stack>
  );
}

export default ProfileSection;
