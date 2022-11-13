import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

import { handleLoginWithEmailAndPassword } from '../../utils';

const LoginForm = ({ setLoading, addUser }) => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  useEffect(() => {
    return () => {
      setLoginDetails({ email: "", password: "" });
    }
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { email, password } = loginDetails;

    if (!email || !password) {
      alert("Please fill out all fields");
      setLoading(false);
    } else {
      await handleLoginWithEmailAndPassword(email, password, addUser);
    }
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}
      style={{ 
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography fontSize="18px" fontWeight="light">Your Email</Typography>
      <input 
        type="email"
        value={loginDetails.email}
        onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
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
        value={loginDetails.password}
        onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
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
          marginTop: "40px", marginBottom: "20px"
        }}
      >
        Continue
      </Button>

    </form>
  )
}

export default LoginForm;
