import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

import useGlobalStore from '../store/globalStore';
import { 
  ProfileSection,
  FriendsSection,
  GroupsSection,
  DiscussionsSection,
  MessagesSection,
  ReadingChallangeSection 
} from '../components/sections';
import { Loader } from '../components/reusable';

const Profile = () => {
  const { navSection, updateNavSection, userDetails } = useGlobalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, [userDetails]);

  useEffect(() => {
    if (navSection?.length && userDetails !== null) {
      document.getElementById(navSection).scrollIntoView({
        behavior: 'smooth'
      });
    }

    updateNavSection("");
  }, []); 

  if (!userDetails) {
    return <Loader />
  }

  return (
    <Stack
      sx={{
        paddingTop: { xs: "120px", md: "60px"}
      }}
    >
      <ProfileSection />
      <FriendsSection />
      <GroupsSection />
      <DiscussionsSection />
      <MessagesSection />
      <ReadingChallangeSection />
    </Stack>
  );
}

export default Profile;
