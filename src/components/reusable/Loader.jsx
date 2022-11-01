import React from 'react';
import { Stack } from '@mui/material';
import { InfinitySpin } from "react-loader-spinner";

const Loader = ({ inScrollingContainer }) => {
  if (inScrollingContainer) {
    return (
      <Stack 
        direction="row" justifyContent="center" alignItems="center" 
        width="100%" height="100%"
      >
        <InfinitySpin color='grey' />
      </Stack>
    )
  }

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" width="100vw" height="100vh"
    >
      <InfinitySpin color='grey' />
    </Stack>
  );
}

export default Loader;
