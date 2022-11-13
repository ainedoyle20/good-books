import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

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
  }, [user, navigate]);

  useEffect(() => {
    if (navSection?.length && userDetails && user) {
      document.getElementById(navSection).scrollIntoView({
        behavior: 'smooth'
      });

      updateSidebarActiveOption(navSection);
    }

    // eslint-disable-next-line
  }, [navSection, userDetails]); 

  useEffect(() => {
    const getUserDetails = async () => {
      await fetchUserDetails(id, addUserDetails);
      // console.log("details", details);
    }

    if (user) {
      getUserDetails();
    }

    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    fetchAllUsers(updateAllUsers);

    // eslint-disable-next-line
  }, []);

  if (!userDetails || !user) {
    return <Loader />
  }

  return (
    <Stack sx={{ paddingTop: { xs: "120px", md: "60px"}, width: "100vw", margin: 0, overflowX: "hidden" }}>
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
