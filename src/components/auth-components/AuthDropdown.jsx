import React, { useState } from 'react';
import { Stack, Typography, Divider, Box } from '@mui/material';

import useGlobalStore from '../../store/globalStore';
import { LoginForm, SignUpForm } from './';
import { Loader } from "../reusable"
import { handleLoginWithGoogle } from "../../utils";

const AuthDropdown = () => {
  const { addUser } = useGlobalStore();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Stack
      spacing={2}
      zIndex="1000"
      padding="15px 0"
      boxShadow="0 5px 10px rgb(0 0 0 / 15%)"
      sx={{
        position: {xs: "absolute", md: "fixed"},
        backgroundColor: "#F4F1EA",
        height: {xs: "auto", md: "700px"},
        width: {xs: "100%", sm: "400px", md: "500px"},
        right: {xs: "0", md: "5px"},
        top: "60px",
        overflowY: {xs: "scoll", md: "hidden"}
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
            <Box width="100%" display="flex" justifyContent="center" gap={4} marginTop="15px"
              sx={{ marginBottom: isLogin ? {xs: "30px", md: "60px"} : {xs: "15px", md: "30px"} }}
            >
              <Typography 
                fontWeight={isLogin ? 600 : 200} fontSize="20px" 
                sx={{ cursor: "pointer" }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Typography>
              <Typography fontWeight={!isLogin ? 600 : 200} fontSize="20px" 
                sx={{ cursor: "pointer" }}
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
