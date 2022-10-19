import React, {useRef, useState, useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { deleteGroups,fetchPublicGroups } from '../../utils';
import { GroupItem, CreateGroupModal } from '../reusable'

const GroupsSection = () => {
  const { user, userDetails, publicGroups, updatePublicGroups } = useGlobalStore();

  const [showMyGroups, setShowMyGroups] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(userDetails?.groups || []);
  const [filteredPublicGroups, setFilteredPublicGroups] = useState(publicGroups);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const [showGroupModal, setShowGroupModal] = useState(false);

  const {id} = useParams();
  const ref = useRef();

  useEffect(() => {
    fetchPublicGroups(updatePublicGroups);
  }, []);

  useEffect(() => {
    if (showMyGroups) {
      setFilteredGroups(userDetails?.groups?.filter((group) => (
        group.groupName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        )
      ));
    } else {
      setFilteredPublicGroups(publicGroups.filter((group) => (
        group.groupName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        )
      ));
    }
    
  }, [searchTerm])

  const scroll = (scrollOffset) => {
    ref.current.scrollTop += scrollOffset;
  };

  const handleDeleteGroups = async () => {
    const success = await deleteGroups(selectedGroups);
    if (success) {
      window.location.reload();
    }
  }

  return (
    <>
    {!showGroupModal ? (
      <Stack
        id="groups_section"
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
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
              <Box sx={{ width: "40%", display: 'flex'}}>
                <Typography
                  onClick={() => setShowGroupModal(true)}
                  sx={{
                    fontSize: "18px",
                    cursor: 'pointer',
                  }}
                >
                  Create Group
                </Typography>

                <Typography
                  onClick={handleDeleteGroups}
                  sx={{
                    fontSize: "18px",
                    cursor: 'pointer',
                    display: selectedGroups.length ? "block" : 'none',
                    marginLeft: '40px'
                  }}
                >
                  Delete
                </Typography>
              </Box>
            ) : (
              null
            )}
            
          </Stack>
        </Stack>

        <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginBottom: 2}}
          onClick={() => scroll(-390)}
        >
          <BsChevronBarUp />
        </Box>

        <Stack
          ref={ref}
          sx={{
            borderRight: '1px solid #382110',
            borderLeft: '1px solid #382110',
            padding: '15px 0',
            width: '50%',
            height: '400px',
            overflowY: 'scroll',
            '&::-webkit-scrollbar':{
              width:0,
            }
          }}
          
        >
          {showMyGroups ? 
            filteredGroups.length ?
              filteredGroups.map((group) => (
                <GroupItem 
                  key={group._id}
                  group={group}
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  user={user}
                  showMyGroups={showMyGroups}
                />
              )) 
            : userDetails?.groups && userDetails?.groups?.length ? (
                <Typography
                  width="100%"
                  height="100%"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    color: '#382110'
                  }}
                >
                  No groups matching &#8220;{searchTerm}&#8221; were found
                </Typography> 
              ) : (
                <Stack
                  width="100%"
                  height="100%"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                  sx={{
                    fontSize: 20,
                    color: '#382110'
                  }}
                  >
                    {user?._id === id ? "You are not a member of any group" : "This user is not a member of any group"} 
                  </Typography>
                  {user?._id === id && (
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: '#382110'
                      }}
                    >
                      Search and join a group or Create a group
                    </Typography>
                  )}
                </Stack>
              )      
            : null   
          }

          {!showMyGroups ? (
            filteredPublicGroups.length ? (
              filteredPublicGroups.map((group) => (
                <GroupItem 
                  key={group._id}
                  group={group}
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  user={user}
                  showMyGroups={showMyGroups}
                />
              ))
            ) :  (
              <Typography
                width="100%"
                height="100%"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 20,
                  color: '#382110'
                }}
              >No Results</Typography> 
            ) 
            ) : null
          }
        </Stack> 
        
        
        <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginTop: 2}}
          onClick={() => scroll(390)}
        >
          <BsChevronBarDown />
        </Box>
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
