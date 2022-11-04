import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { fetchPublicGroups } from '../../utils';
import { ScrollingContainer } from '../reusable';
import { CreateGroupModal } from '../reusable/modals';
import { GroupItem } from '../reusable/list-items';

const GroupsSection = () => {
  const { user, userDetails, publicGroups, updatePublicGroups } = useGlobalStore();

  const [showMyGroups, setShowMyGroups] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(userDetails?.groups ? userDetails.groups : []);
  const [filteredPublicGroups, setFilteredPublicGroups] = useState(publicGroups ? publicGroups : []);

  const [showGroupModal, setShowGroupModal] = useState(false);

  const {id} = useParams();

  useEffect(() => {
    fetchPublicGroups(updatePublicGroups);
  }, []);

  useEffect(() => {
    if (showMyGroups && userDetails?.groups) { // checking if groups exist on userDetails
      setFilteredGroups(userDetails?.groups?.filter((group) => (
        group.groupName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        )
      ));

    } else if (!showMyGroups && publicGroups) { // checking if publicGroups are not null
      setFilteredPublicGroups(publicGroups.filter((group) => (
        group.groupName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        )
      ));
    }
    
  }, [searchTerm, userDetails]);

  return (
    <>
      {!showGroupModal ? (
        <Stack
          id="groups_section" width="100vw" height="100vh" display="flex"
          alignItems="center" justifyContent="center"
        >
          
          <Stack width="50%" 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginBottom: '30px'
            }}
          >
            <Box sx={{ display: 'flex', marginBottom: "30px"}}>
              <Typography
                onClick={() => {
                  setShowMyGroups(true);
                  setSearchTerm("");
                  setFilteredGroups(userDetails?.groups ? userDetails?.groups : []);
                }}
                sx={{
                  fontSize: 25,
                  textDecoration: showMyGroups ? 'underline' : 'none',
                  margin: '0 20px',
                  color: '#382110',
                  fontWeight: '300',
                  cursor: 'pointer',
                }}
              >
                my groups
              </Typography>
              <Typography
                onClick={() => {
                  setShowMyGroups(false);
                  setSearchTerm("");
                  setFilteredPublicGroups(publicGroups);
                }}
                sx={{
                  fontSize: 25,
                  textDecoration: !showMyGroups ? 'underline' : 'none',
                  margin: '0 20px',
                  color: '#382110',
                  fontWeight: '300',
                  cursor: 'pointer',
                }}
              >
                public groups
              </Typography>
            </Box>

            <Stack direction="row" width="100%" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Box sx={{ position: 'relative', backgroundColor: 'white', width: "40%"}}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={showMyGroups ? "Search your groups..." : "Search public groups..."}
                  style={{
                    position: "relative",
                    width: "80%",
                    height: '100%',
                    padding: "10px 5px",
                    fontSize: '18px',
                    outline: 'none',
                    border: 'none',
                  }}
                />

                <img
                  src="https://s.gr-assets.com/assets/layout/header/icn_nav_search.svg"
                  alt="search"
                  height="20px"
                  width="20px"
                  style={{ 
                    position: 'absolute',
                    right: 10,
                    top: "10px",
                  }}
                />
              </Box>
              
              {user._id === id ? (
                <Box paddingRight="25px">
                  <Typography
                    onClick={() => setShowGroupModal(true)}
                    sx={{ fontSize: "18px", cursor: 'pointer' }}
                  >
                    Create Group
                  </Typography>
                </Box>
              ) : null}
            </Stack>
          </Stack>

          {showMyGroups ? (
            <ScrollingContainer>
              {filteredGroups.length 
                ? filteredGroups.map((group) => (
                    <GroupItem 
                      key={group._id}
                      group={group}
                      user={user}
                      showMyGroups={showMyGroups}
                    />
                  )) 
                : null
              }

              {!filteredGroups.length && searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      No Results
                    </Typography>
                  ) 
                : null
              }

              {!filteredGroups.length && !searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      You are not a member of any group <br/>
                      Join an existing group or Create a group
                    </Typography>
                  ) 
                : null
              }

            </ScrollingContainer>

          ) : null}

          {!showMyGroups ? (
            <ScrollingContainer>
              {filteredPublicGroups.length 
                ? filteredPublicGroups.map((group) => (
                    <GroupItem 
                      key={group._id}
                      group={group}
                      user={user}
                      showMyGroups={showMyGroups}
                    />
                  )) 
                : null
              }

              {!filteredPublicGroups.length && searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      No Results
                    </Typography>
                  ) 
                : null
              }

              {!filteredPublicGroups.length && !searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      There are no Public Groups
                    </Typography>
                  ) 
                : null
              }

            </ScrollingContainer>

          ) : null}

        </Stack>
      ) : null
      }

      {showGroupModal ? (
        <CreateGroupModal 
          user={user}
          userDetails={userDetails}
          setShowGroupModal={setShowGroupModal}
        />
      ) : (
        null
      )}
    </>
  );
}

export default GroupsSection;
