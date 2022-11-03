import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { MdMenu } from "react-icons/md";

import useGlobalStore from '../store/globalStore';
import { 
  ProfileSection,
  FriendsSection,
  MyBooksSection,
  GroupsSection,
  DiscussionsSection,
  MessagesSection,
} from '../components/sections';
import { Loader, Sidebar } from '../components/reusable';
import { fetchUserDetails, fetchAllUsers } from '../utils';

const Profile = () => {
  const { 
    navSection, user, userDetails, addUserDetails,
    updateSidebarActiveOption, updateAllUsers, 
  } = useGlobalStore();

  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (navSection?.length && userDetails && user) {
      document.getElementById(navSection).scrollIntoView({
        behavior: 'smooth'
      });

      updateSidebarActiveOption(navSection);
    }
  }, [navSection, userDetails]); 

  useEffect(() => {
    const getUserDetails = async () => {
      await fetchUserDetails(id, addUserDetails);
      // console.log("details", details);
    }

    if (user) {
      getUserDetails();
    }
  }, [id]);

  useEffect(() => {
    fetchAllUsers(updateAllUsers);
  }, []);

  if (!userDetails || !user) {
    return <Loader />
  }

  return (
    <Stack sx={{ paddingTop: { xs: "120px", md: "60px"} }}>
      <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <ProfileSection />
      <MyBooksSection />
      <FriendsSection />
      <GroupsSection />
      <DiscussionsSection />
      <MessagesSection />
    </Stack>
  );
}

export default Profile;
