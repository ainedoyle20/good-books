import { v4 as uuidv4 } from 'uuid';

import { loginWithGoogle, login, createUser, logout } from './firebase';
import { client } from './client';
import { userDetailsQuery, 
  allUsersQuery, 
  publicGroupsQuery, 
  allGroupsQuery, 
  myGroupsQuery, 
  specificGroupQuery,
  specificDiscussionQuery
} from './queries';

export const handleLoginWithGoogle = async (storeUser) => {
  const userObject = await loginWithGoogle();
  if (!userObject.displayName) {
    userObject.displayName="User"
  }

  if (!userObject.photoURL) {
    console.log("google photo", userObject.photoURL);
    userObject.photoURL = "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
  }

  await createOrGetUser(userObject, storeUser);
  return true;
}

export const handleLoginWithEmailAndPassword = async (email, password, storeUser) => {
  const userObject = await login(email, password);
  await createOrGetUser(userObject, storeUser);
  return true;
}

export const handleSignUpWithEmailAndPassword = async (email, password, userName, storeUser) => {
  const userObject = await createUser(email, password);
  userObject.displayName = userName;
  userObject.photoURL="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png";

  await createOrGetUser(userObject, storeUser);
  return true;
}

export const createOrGetUser = async (firebaseUser, storeUserFunc) => {
  const { displayName, uid, photoURL } = firebaseUser;

  const userDoc = {
    _id: uid,
    _type: 'user',
    userName: displayName,
    image: photoURL,
  }

  // add user to sanity
  try {
    const data = await client.createIfNotExists(userDoc);
    // console.log("success logging in: ", data);
    
    // storing sanity user _id in object in zustand
    storeUserFunc({ _id: data._id, image: data.image });
  } catch (error) {
    console.log("Error logging in: ", error);
  }
  
}

export const handleLogout = async (removeUserFunc, removeUserDetailsFunc, ) => {
  await logout();
  removeUserFunc();
  removeUserDetailsFunc();
}

export const fetchAllUsers = async (setAllUsers) => {
  const query = allUsersQuery();

  try {
    const allMembers = await client.fetch(query);
    setAllUsers(allMembers);
  } catch (error) {
    console.log("error getting all users: ", error);
  }
}

export const fetchUserDetails = async (id, setUserDetails) => {
  const query = userDetailsQuery(id);

  try {
    const data = await client.fetch(query);
    setUserDetails(data[0]);
    return data[0];
  } catch (error) {
    console.log("error fetching user details: ", error);
  }
}

export const updateUserImage = async (imageUrl, id) => {
  try {
    await client.patch(id).set({ image: imageUrl }).commit();
    console.log('successfully updated user image');
  } catch (error) {
    console.log("error updating user image: ", error);
  }
}

export const incrementReadingChallange = async (id) => {
  try {
    await client.patch(id).setIfMissing({ readingChallange: 0 }).inc({ readingChallange: 1 }).commit();
    console.log('successfully incremented readingChallange');
    return true;
  } catch (error) {
    console.log('error incrementing readingChallange')
  }
}

export const decrementReadingChallange = async (id) => {
  try {
    await client.patch(id).dec({ readingChallange: 1 }).commit();
    console.log('successfully decremented readingChallange');
    return true;
  } catch (error) {
    console.log('error decrementing readingChallange')
  }
}

export const requestFriendship = async (userId, memberId) => {
  // console.log("userId: ", userId);
  // console.log("memberId: ", memberId);
  try {
    await client.patch(memberId)
      .setIfMissing({ friendRequests: [] })
      .insert("after", "friendRequests[-1]", [{ 
        _key: uuidv4(),
        _type: 'reference',
        _ref: userId 
      }])
      .commit();

    await client.patch(userId)
      .setIfMissing({ requestedFriends: [] })
      .insert("after", "requestedFriends[-1]", [{ 
        _key: uuidv4(),
        _type: 'reference',
        _ref: memberId 
      }])
      .commit();
    
    return true;
  } catch (error) {
    console.log('Error requesting friendship: ', error);
  }
}

export const acceptFriendRequest = async (userId, memberId) => {
  const ids = [userId, memberId];
  // console.log("userId: ", userId);
  // console.log("memberId: ", memberId);
  try {
    await Promise.all(ids.map(async (id) => {
      if (id === userId) {
        await client.patch(userId).setIfMissing({ friends: [] }).insert("after", "friends[-1]", [{ 
          _key: uuidv4(),
          _type: 'reference',
          _ref: memberId 
        }])
        .unset([`friendRequests[_ref=="${memberId}"]`])
        .commit();
      } else {
        await client.patch(memberId).setIfMissing({ friends: [] }).insert("after", "friends[-1]", [{ 
          _key: uuidv4(),
          _type: 'reference',
          _ref: userId 
        }])
        .unset([`requestedFriends[_ref=="${userId}"]`])
        .commit();
      }
    }))

    // await client.patch(userId).unset([`requestedFriends[_ref=="${memberId}"]`]).commit();

    return true;
  } catch (error) {
    console.log('Error accepting friendship: ', error);
  }
}

export const unfriendMember = async (userId, friendId) => {
  console.log("friendId: ", friendId);
  try {
    await client.patch(userId).unset([`friends[_ref=="${friendId}"]`]).commit();
    await client.patch(friendId).unset([`friends[_ref=="${userId}"]`]).commit();
    return true;
  } catch (error) {
    console.log("Error unfriending memeber: ", error);
  }
}

export const createGroup = async (userId, groupName, groupMembers, isPublic) => {
  const members = groupMembers.map((memberId) => (
    {
      _key: uuidv4(),
      _type: 'reference',
      _ref: `${memberId}`
    }
  ));

  console.log("members: ", members);

  const groupDoc = {
    _type: 'group',
    groupName,
    discussions: [],
    members,
    postedBy: {
      _type: 'postedBy',
      _ref: `${userId}`
    },
    public: isPublic,
  }

  try {
    const {_id} = await client.create(groupDoc);

    await Promise.all(groupMembers.map(async (memberId, idx) => {
      if (idx === groupMembers.length-1) console.log('got here: ', idx);
      await client.patch(memberId)
        .setIfMissing({ groups: [] }).insert("after", "groups[-1]", [{
          _key: uuidv4(),
          _ref: _id,
          _type: 'reference',
        }])
        .commit()
    }));

    // await client.patch(groupMembers).setIfMissing({ groups: [] }).insert("after", "groups[-1]", [_id]).commit();

    return true;
    
  } catch (error) {
    console.log("Error creating group: ", error);
  }
}

export const fetchPublicGroups = async (setPublicGroups) => {
  const query = publicGroupsQuery();

  try {
    const publicGroups = await client.fetch(query);
    setPublicGroups(publicGroups);
  } catch (error) {
    console.log('Error fetching public groups: ', error);
  }
}

export const fetchAllGroups = async (setAllGroups) => {
  const query = allGroupsQuery();

  try {
    const allGroups = await client.fetch(query);
    // console.log("allGroups: ", allGroups);
    setAllGroups(allGroups);
  } catch (error) {
    console.log('Error fetching all groups: ', error);
  }
}

export const fetchMyGroups = async (idArray) => {
  const queryArray = idArray.map((groupId) => `"${groupId}"`);
  // console.log("queryArray: ", queryArray);
  const query = myGroupsQuery(queryArray);

  try {
    const myGroups = await client.fetch(query);
    // console.log("myGroups: ", myGroups);
    return myGroups;
  } catch (error) {
    console.log('Error fetching your groups: ', error);
  }
}

export const fetchSpecificGroup = async (groupId) => {
  const query = specificGroupQuery(groupId);

  try {
    const data = await client.fetch(query);
    return data[0];
  } catch (error) {
    console.log("Error fetching specific group: ", error);
  }
}

export const deleteGroups = async (selectedGroupsArray) => {
  try {
    await Promise.all(selectedGroupsArray.map(async (group, idx) => {
      console.log(`group-${idx}: `, group);
      await Promise.all(group.members.map(async (member, index) => {
        console.log(`member-${index}: `, member);
        await client.patch(member._id).unset([`groups[_ref=="${group._id}"]`]).commit();
      }))

      await client.delete(group._id);
    }))

    return true;
  } catch (error) {
    console.log('Error deleting groups: ', error);
  }


  // const queryGroup = groupIdArray.map((groupId) => `"${groupId}"`);
  // // console.log(queryGroup);
  // // console.log(`*[_type=="group" && _id in [${queryGroup}]]`);
  // try {
  //   await client.delete({ query: `*[_type=="group" && _id in [${queryGroup}]][0..${queryGroup.length}]`});
  //   console.log('Success deleting groups');
  //   return true;
  // } catch (error) {
  //   console.log('Error deleting groups: ', error);
  // }
}

export const createDiscussion = async (userId, discussionName, groupId, groupName) => {
  // Create discussion document
  const discussionDoc = {
    _type: "discussion",
    _key: uuidv4(),
    groupId,
    groupName,
    discussionName,
    creator: {
      _type: 'postedBy',
      _ref: userId
    },
    participants: [],
    contributions: [],
  }

  try {
    // Create discussion document
    const {_id} = await client.create(discussionDoc);

    // Add reference to discussin document in group document
    await client.patch(groupId)
      .setIfMissing({ discussions: [] })
      .insert("after", "discussions[-1]", [{
        _key: uuidv4(),
        _type: "reference",
        _ref: _id
      }])
      .commit();

    return true;
  } catch (error) {
    console.log("Error creating discussion: ", error);
  }

}

export const fetchSpecificDiscussion = async (discussionId) => {
  const query = specificDiscussionQuery(discussionId);

  try {
    const data = await client.fetch(query);
    return data[0];
  } catch (error) {
    console.log("Error fetching specific discussion: ", error);
  }
}

export const addDiscussionContribution = async (userId, discussionId, isParticipant, isNewDate, text, datedMessagesKey) => {
  console.log("isParticipant: ", isParticipant, "isNewDate: ", isNewDate, "datedMessagesKey: ", datedMessagesKey);

  try {
    if (isNewDate) {
      console.log("IS NEW DATE");
      // creating new datedMessage object with new contribution
      await client.patch(discussionId)
        .setIfMissing({ contributions: [] })
        .insert("after", `contributions[-1]`, [{
          _type: "datedMessages",
          _key: uuidv4(),
          messageDate: new Date().toDateString(),
          texts: [{
            _type: "message",
            _key: uuidv4(),
            text,
            postedBy: {
              _type: 'reference',
              _ref: userId
            }
          }]
        }])
        .commit();

    } else {
      console.log("NOT NEW DATE");
      // adding new contribution (text) to existing datedMessage object
      await client.patch(discussionId)
        .setIfMissing({ contributions: [] })
        .insert("after", `contributions[_key=="${datedMessagesKey}"].texts[-1]`, [{
          _type: "message",
          _key: uuidv4(),
          text,
          postedBy: {
            _type: 'reference',
            _ref: userId
          }
        }])
        .commit();

    }

    // Adding current user as participant if not already
    if (!isParticipant) {
      await client.patch(discussionId)
        .setIfMissing({ participants: [] })
        .insert("after", "participants[-1]", [{
          _type: "reference",
          _ref: userId,
          _key: uuidv4()
        }])
        .commit();
    }

    return true;

  } catch (error) {
    console.log("Error adding contribution: ", error);
  }
}

export const checkIfMessaged = (messagedUsers, friendId) => {
  const filtered = messagedUsers.filter((obj) => (
    obj.messageFriend._id === friendId
  ));

  return filtered.length 
    ? {isMessageFriend: true, messageObj: filtered[0]} 
    : {isMessageFriend: false, messageObj: null}
}

export const createSanityMessageObj = async (userId, friendId) => {
  const ids = [`${userId}`, `${friendId}`];
  const uniqueKey = uuidv4();
  const datedMessagesKey = uuidv4();

  try {
    const data = await Promise.all(ids.map(async (id, idx) => (
      await client.patch(id)
        .setIfMissing({ messagedUsers: []})
        .insert("after", "messagedUsers[-1]", [{
          _key: uniqueKey,
          _type: 'messagedUser',
          messageFriend: {
            _ref: idx === 0 ? ids[1] : ids[0],
            _type: 'reference',
          },
          datedMessages: [
            {
              _type: 'datedMessages',
              _key: datedMessagesKey,
              messageDate: new Date().toDateString(),
              texts: [],
            }
          ],
        }])
        .commit()
    )));

    const messageObj = data[0]?.messagedUsers?.filter((obj) => obj._key === uniqueKey);
    return messageObj;
  } catch (error) {
    console.log("Error creating sanity message object: ", error);
  }
}

export const createMessageObject = async (userId, friendId) => {
  const ids = [`${userId}`, `${friendId}`];
  const uniqueKey = uuidv4();
  const datedMessagesKey = uuidv4();

  try {
    const data = await Promise.all(ids.map(async (id, idx) => (
      await client.patch(id)
        .setIfMissing({ messagedUsers: []})
        .insert("after", "messagedUsers[-1]", [{
          _key: uniqueKey,
          _type: 'messagedUser',
          messageFriend: {
            _ref: idx === 0 ? ids[1] : ids[0],
            _type: 'reference',
          },
          datedMessages: [
            {
              _type: 'datedMessages',
              _key: datedMessagesKey,
              messageDate: new Date().toDateString(),
              texts: [],
            }
          ],
        }])
        .commit()
    )));

    const messageKey = data[0]?.messagedUsers?.filter((obj) => obj._key === uniqueKey);
    console.log("messageKey: ", messageKey[0]?._key);
    console.log("uniqueKey: ", uniqueKey);
    // return messageKey[0]?._key;

    return uniqueKey;
  } catch (error) {
    console.log("Error creating messageObject: ", error);
  }
}

export const sendMessage = async (userId, friendId, messagedUserKey, datedMessageKey, isNewDate, text) => {
  const ids = [userId, friendId];
  const newMessageKey = uuidv4();
  const newDatedMessageKey = uuidv4();

  if (isNewDate) {
    try {
      await Promise.all(ids.map(async (id) => (
        await client.patch(id)
          .insert("after", `[_key=="${messagedUserKey}"].datedMessages[-1]`, [{
            _type: 'datedMessages',
            _key: newDatedMessageKey,
            messageDate: new Date().toDateString(),
            texts: [{
              _type: 'message',
              _key: newMessageKey,
              text: text,
              postedBy: {
                _type: 'postedBy',
                _ref: userId
              }
            }],
          }])
          .commit()
      )));

      console.log('added text with new date');

    } catch (error) {
      console.log("Error sending message with new Date: ", error);
    }
  } else {
    try {
      await Promise.all(ids.map(async (id) => (
        await client.patch(id)
          .insert("after", `messagedUsers[_key=="${messagedUserKey}"].datedMessages[_key=="${datedMessageKey}"].texts[-1]`, [{
            _type: 'message',
            _key: newMessageKey,
            text: text,
            postedBy: {
              _type: 'postedBy',
              _ref: userId
            }
          }]).commit()
      )))
  
      console.log("added text");
    } catch (error) {
      console.log("Error adding text: ", error);
    }
  }
}

export const formatDateString = (str) => {
  let strArr = str.split(" ").slice(0, 3);

  const swap = (arr, idx1, idx2) => {
    return [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }
  swap(strArr, 1, 2);

  strArr[0] = strArr[0] + ",";

  let formattedStr = strArr.join(" ");

  return formattedStr;
}