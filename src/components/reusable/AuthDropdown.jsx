import React, { useState } from 'react';
import { Stack, Typography, Divider, Box } from '@mui/material';

import useGlobalStore from '../../store/globalStore';
import { LoginForm, SignUpForm, Loader } from './';
import { handleLoginWithGoogle } from '../../utils';

const AuthDropdown = () => {
  const { addUser } = useGlobalStore();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Stack
      position="fixed"
      top="60px"
      right="5px"
      spacing={2}
      width="500px"
      height="700px"
      zIndex="1000"
      padding="15px 0"
      boxShadow="0 5px 10px rgb(0 0 0 / 15%)"
      sx={{
        backgroundColor: "#F4F1EA",
      }}
    >
      {loading ? (
        <Loader inScrollingContainer={true} />
      ) : (
        <>
          <Box width="100%" display="flex" justifyContent="center" padding="20px 0" marginTop="10px">
            <Typography 
              onClick={() => handleLoginWithGoogle(addUser)} 
              variant="h6" color="#382110" sx={{ cursor: "pointer", ":hover": {padding: "5px 14px"}}}
              border="1px solid #c2beb8" borderRadius="15px" padding="5px 15px"
            >
              Continue with Google
            </Typography>
          </Box>

          <Divider component="li" style={{ listStyle: "none", borderColor: "#382110", marginLeft: "10px", marginRight: "10px"}} />

          <Stack width="100%" height="100%">
            <Box width="100%" display="flex" justifyContent="center" gap={4} marginTop="15px">
              <Typography fontWeight={isLogin ? 600 : 200} fontSize="20px" sx={{ cursor: "pointer" }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Typography>
              <Typography fontWeight={!isLogin ? 600 : 200} fontSize="20px" sx={{ cursor: "pointer" }}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </Typography>
            </Box>

            {isLogin ? (
              <LoginForm setLoading={setLoading} addUser={addUser} />
            ) : (
              <SignUpForm setLoading={setLoading} addUser={addUser} />
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default AuthDropdown;
