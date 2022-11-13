import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

import { handleSignUpWithEmailAndPassword } from '../../utils';

const SignUpForm = ({ setLoading, addUser }) => {
  const [signUpDetails, setSignUpDetails] = useState({ 
    userName: "",
    email: "", 
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    return () => {
      setSignUpDetails({ 
        userName: "",
        email: "", 
        password: "",
        confirmPassword: "",
      });
    }
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { userName, email, password, confirmPassword } = signUpDetails;

    if (!userName || !email || !password || !confirmPassword ) {
      alert("Please fill out all fields");
      setLoading(false);
    } else if (confirmPassword !== password) {
      alert("Passwords do not match");
      setLoading(false);
    } else {

      await handleSignUpWithEmailAndPassword(email, password, userName, addUser);
    }
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} 
      style={{ 
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography fontSize="18px" fontWeight="light">Your UserName</Typography>
      <input 
        type="text"
        value={signUpDetails.userName}
        onChange={(e) => setSignUpDetails({ ...signUpDetails, userName: e.target.value })}
        required
        style={{
          border: "none",
          outline: "none",
          padding: "12px",
          paddingBottom: "5px",
          backgroundColor: "#F4F1EA",
          borderBottom: "1px solid #c2beb8",
          marginBottom: "20px",
          width: "60%",
          fontSize: "18px"
        }}
      />

      <Typography fontSize="18px" fontWeight="light">Your Email</Typography>
      <input 
        type="email"
        value={signUpDetails.email}
        onChange={(e) => setSignUpDetails({ ...signUpDetails, email: e.target.value })}
        required
        style={{
          border: "none",
          outline: "none",
          padding: "12px",
          paddingBottom: "5px",
          backgroundColor: "#F4F1EA",
          borderBottom: "1px solid #c2beb8",
          marginBottom: "20px",
          width: "60%",
          fontSize: "18px"
        }}
      />

      <Typography fontSize="18px" fontWeight="light">Your Password</Typography>
      <input  
        type="password"
        value={signUpDetails.password}
        onChange={(e) => setSignUpDetails({ ...signUpDetails, password: e.target.value })}
        required
        style={{
          border: "none",
          outline: "none",
          padding: "12px",
          paddingBottom: "5px",
          backgroundColor: "#F4F1EA",
          borderBottom: "1px solid #c2beb8",
          marginBottom: "40px",
          width: "60%",
          fontSize: "18px"
        }}
      />

      <Typography fontSize="18px" fontWeight="light">Confirm Password</Typography>
      <input  
        type="password"
        value={signUpDetails.confirmPassword}
        onChange={(e) => setSignUpDetails({ ...signUpDetails, confirmPassword: e.target.value })}
        required
        style={{
          border: "none",
          outline: "none",
          padding: "12px",
          paddingBottom: "5px",
          backgroundColor: "#F4F1EA",
          borderBottom: "1px solid #c2beb8",
          width: "60%",
          fontSize: "18px"
        }}
      />

      <Button
        type="submit"
        sx={{ 
          ":hover": {padding: "5px 14px", backgroundColor: "#F4F1EA"},
          fontSize: "14px", fontWeight: "600", color: "#382110", cursor: "pointer",
          border: "1px solid #c2beb8", borderRadius: "15px", padding: "5px 15px",
          marginTop: {xs: "20px", md: "30px"}, marginBottom: "15px"
        }}
      >
        Continue
      </Button>
    </form>
  );
}

export default SignUpForm;
