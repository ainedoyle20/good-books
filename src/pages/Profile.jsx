import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import useGlobalStore from '../store/globalStore';
import { 
  ProfileSection,
  FriendsSection,
  GroupsSection,
  DiscussionsSection,
  MessagesSection,
  ReadingChallangeSection,
} from '../components/sections';
import { Loader, Sidebar } from '../components/reusable';
import { fetchUserDetails, fetchAllUsers } from '../utils';

const Profile = () => {
  const { 
    navSection,
    updateNavSection,
    user,
    userDetails,
    addUserDetails,
    removeUserDetails,
    updateSidebarActiveOption,
    updateAllUsers, 
  } = useGlobalStore();

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (navSection?.length && userDetails !== null) {
      document.getElementById(navSection).scrollIntoView({
        behavior: 'smooth'
      });

      updateSidebarActiveOption(navSection);
      updateNavSection("");
    } else {
      return;
    }
  }, [userDetails]); 

  useEffect(() => {
    const getUserDetails = async () => {
      fetchUserDetails(id, addUserDetails);
    }

    if (user) {
      getUserDetails();
    }

    return () => {
      removeUserDetails();
    }
  }, [id]);

  useEffect(() => {
    fetchAllUsers(updateAllUsers);
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
      <Sidebar />
      <ProfileSection />
      <FriendsSection />
      <GroupsSection />
      <DiscussionsSection />
      <MessagesSection />
    </Stack>
  );
}

export default Profile;
