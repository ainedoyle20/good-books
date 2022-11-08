import { v4 as uuidv4 } from 'uuid';

import { loginWithGoogle, login, createUser, logout } from './firebase';
import { client } from './client';
import { userDetailsQuery, 
  allUsersQuery, 
  publicGroupsQuery, 
  allGroupsQuery, 
  myGroupsQuery, 
  specificGroupQuery,
  specificDiscussionQuery,
  getShelvesQuery
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
  console.log("fetching user details");
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

export const addUserToGroup = async (groupId, userId) => {
  if (!groupId || !userId) return;
  try {
    await client.patch(groupId)
      .setIfMissing({ members: [] })
      .insert("after", "members[-1]", [{
        _key: uuidv4(),
        _type: "reference",
        _ref: userId
      }])
      .commit();

    await client.patch(userId)
      .setIfMissing({ groups: [] })
      .insert("after", "groups[-1]", [{
        _key: uuidv4(),
        _type: "reference",
        _ref: groupId
      }])
      .commit();
  } catch (error) {
    console.log("Error adding user to group: ", error);
  }
}

export const blockUserInGroup = async (groupId, toBlockId) => {
  console.log("blocking user...");
  try {
    await client.patch(groupId)
      .setIfMissing({ blockedUsers: [] })
      .insert("after", "blockedUsers[-1]", [{
        _key: uuidv4(),
        _type: "reference",
        _ref: toBlockId
      }])
      .commit();
  } catch (error) {
    console.log("Error blocking user in group: ", error);
  }
}

export const unBlockUserInGroup = async (groupId, toUnBlockId) => {
  console.log("unblocking user...");
  try {
    await client.patch(groupId)
      .unset([`blockedUsers[_ref=="${toUnBlockId}"]`])
      .commit();
  } catch (error) {
    console.log("Error unblocking user in group: ", error);
  }
}

export const deleteGroup = async (groupId, members, discussions) => {
  // console.log("discussions: ", discussions);
  try {
    await Promise.all(members.map(async (member) => (
      await client.patch(member._id).unset([`groups[_ref=="${groupId}"]`]).commit()
    )));

    await client.delete(groupId);

    await Promise.all(discussions.map(async (discussion) => (
      await client.delete(discussion._id)
    )));
  } catch (error) {
    console.log("Error deleting group: ", error);
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

const findMyDiscussions = (discussionsList, userId) => {
  const myDiscussionsList=[];
  discussionsList.forEach((discussion) => {
    let isParticipant;
    discussion.participants.map((participant) => {
      if (participant._ref === userId) {
        isParticipant = true;
      }
      return participant;
    });

    if (isParticipant) {
      myDiscussionsList.push(discussion);
    }

    return discussion;
  });

  return myDiscussionsList;
}

const getPublicDiscussionsList = (publicGroupsList) => {
  const discussionsList = [];

  publicGroupsList.forEach((publicGroup) => {
    publicGroup.discussions.forEach((discussion) => discussionsList.push(discussion));
  });

  return discussionsList;
} 

export const fetchMyDiscussions = async (userId) => {
  try {
    const allDiscussions = await client.fetch('*[_type=="discussion"]');
    const myDiscussions = findMyDiscussions(allDiscussions, userId);
    return myDiscussions;
  } catch (error) {
    console.log("Error getting user's discussions: ", error);
  }
}

export const fetchPublicDiscussions = async () => {
  try {
    const publicGroupsList =  await client.fetch(`*[_type == "group" && public==true]{
      discussions[]->{
        _id,
        discussionName,
        groupName,
        participants
      }
    }`);
    const publicDiscussionsList = getPublicDiscussionsList(publicGroupsList);
    return publicDiscussionsList;
  } catch (error) {
    console.log("Error fetching public discussions: ", error);
  }
}

export const addContributionNewDate = async (userId, discussionId, isParticipant, text) => {
  try {
    await client.patch(discussionId)
      .setIfMissing({ contributions: [] })
      .insert("after", "contributions[-1]", [{
        _type: "datedMessages",
        _key: uuidv4(),
        messageDate: new Date().toDateString(),
        texts: [{
          _type: 'message',
          _key: uuidv4(),
          text,
          postedBy: {
            _type: 'postedBy',
            _ref: userId
          }
        }],
      }])
      .commit();
    
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
  } catch (error) {
    console.log("Error adding contribution with date: ", error);
  }
}

export const addContribution = async (userId, discussionId, contributionKey, isParticipant, text) => {
  try {
    await client.patch(discussionId)
      .setIfMissing({ contributions: [] })
      .insert("after", `contributions[_key=="${contributionKey}"].texts[-1]`, [{
        _type: 'message',
        _key: uuidv4(),
        text,
        postedBy: {
          _type: 'postedBy',
          _ref: userId
        }
      }])
      .commit();
    
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
  } catch (error) {
    console.log("Error adding contribution: ", error);
  }
}

export const blockUserInDiscussion = async (discussionId, toBlockId) => {
  console.log("blocking user...");
  try {
    await client.patch(discussionId)
      .setIfMissing({ blockedUsers: [] })
      .insert("after", "blockedUsers[-1]", [{
        _key: uuidv4(),
        _type: "reference",
        _ref: toBlockId
      }])
      .commit();
  } catch (error) {
    console.log("Error blocking user in discussion: ", error);
  }
}

export const unBlockUserInDiscussion = async (discussionId, toUnBlockId) => {
  console.log("unblocking user...");
  try {
    await client.patch(discussionId)
      .unset([`blockedUsers[_ref=="${toUnBlockId}"]`])
      .commit();
  } catch (error) {
    console.log("Error unblocking user in discussion: ", error);
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

export const createSanityMessageObj = async (userId, friendId, addUserDetailsFunc) => {
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

    await fetchUserDetails(userId, addUserDetailsFunc);

    const messageObj = data[0]?.messagedUsers?.filter((obj) => obj._key === uniqueKey);
    return messageObj[0];
  } catch (error) {
    console.log("Error creating sanity message object: ", error);
  }
}

export const sendMessageNewDate = async (userId, friendId, messageFriendKey, text) => {
  const ids = [userId, friendId];
  const datedMessageKey = uuidv4();
  const textKey = uuidv4();

  try {
    await Promise.all(ids.map( async (id) => (
      await client.patch(id)
        .insert("after", `messagedUsers[_key=="${messageFriendKey}"].datedMessages[-1]`, [{
          _key: datedMessageKey,
          _type: 'datedMessages',
          messageDate: new Date().toDateString(),
          texts: [{
            _key: textKey,
            _type: "message",
            postedBy: {
              _type: 'postedBy',
              _ref: userId
            },
            text
          }]
        }])
        .commit()
    )));
  } catch (error) {
    console.log("Error adding message with new date: ", error);
  }
}

export const sendMessage = async (userId, friendId, messageFriendKey, datedMessageKey, text) => {
  const ids = [userId, friendId];
  const textKey = uuidv4();
  try {
    await Promise.all(ids.map(async (id) => (
      await client.patch(id)
        .insert("after", `messagedUsers[_key=="${messageFriendKey}"].datedMessages[_key=="${datedMessageKey}"].texts[-1]`, [{
          _key: textKey,
          _type: "message",
          postedBy: {
            _type: "postedBy",
            _ref: userId
          },
          text
        }])
        .commit()
    )));
  } catch (error) {
    console.log("Error sending message: ", error);
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

export const formatLargeImgUrl = (smallImgUrl) => {
  if (!smallImgUrl) return;
  const idsString = smallImgUrl.split("books/")[1]?.split(".")[0];
  if (!idsString) return;
  
  const longId = idsString.split("/")[0];
  const shortId = idsString.split("/")[1];
  
  return `https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${longId}/${shortId}.jpg`;
}

const shelfObject = {
  1: "wantToRead",
  2: "currentlyReading",
  3: "read"
};

// const checkIfInOtherShelves = (bookId, otherShelves) => {
//   let otherShelf;

//   otherShelves.forEach((shelf) => {
//     if (shelf) {
//       shelf.forEach((book) => {
//         if (book === bookId) {
//           otherShelf = shelf.name;
//         }
//       })
//     }
//   });

//   if (otherShelf) {
//     console.log("otherShelf name: ", otherShelf);
//     const otherShelfKey = Object.keys(shelfObject).find(key => shelfObject[key] === otherShelf);
//     otherShelf = otherShelfKey;
//   }

//   console.log("otherShelf: ", otherShelf);
//   return otherShelf;
// }

const checkIfInSameShelfAlready = (bookId, activeShelf) => {
  let inShelf = false;

  if (activeShelf && activeShelf.length) {
    activeShelf.forEach((book) => {
      if (book.bookId === bookId) {
        inShelf = true;
      }
    }); 
  }

  return inShelf;
}

export const removeBookFromShelf = async (userId, shelfKey, bookKey) => {
  console.log(shelfKey, userId, bookKey);
  if (!shelfKey || !userId || !bookKey) return;

  const chosenShelf = shelfObject[shelfKey];

  console.log("bookKey: ", bookKey, "chosenShelf: ", chosenShelf);

  try {
    await client.patch(userId)
      .unset([`${chosenShelf}[_key=="${bookKey}"]`])
      .commit();
  } catch (error) {
    console.log("Error removing book from shelf: ", error);
  }
}

export const addBookToShelf = async (userId, bookDetails, shelfKey) => {
  if (!shelfKey || !userId || !bookDetails?.book_id) return;

  const chosenShelf = shelfObject[shelfKey];

  const userShelvesQuery = getShelvesQuery(userId);
  const data = await client.fetch(userShelvesQuery);
  const { wantToRead, currentlyReading, read } = data[0];
  const shelves = [wantToRead, currentlyReading, read];

  const { book_id, name, cover, authors, rating } = bookDetails;

  const activeShelf = shelves[shelfKey-1];
  const inSameShelf = checkIfInSameShelfAlready(book_id, activeShelf);

  if (inSameShelf) {
    return;
  } 

  console.log("adding book..");
  try {
    await client.patch(userId)
      .setIfMissing({ [chosenShelf]: [] })
      .insert("after", `${chosenShelf}[-1]`, [{
        _key: uuidv4(),
        type: "bookDetails",
        bookId: book_id,
        bookTitle: name,
        bookCover: cover,
        bookAuthors: authors,
        bookRating: rating,
        dateAdded: new Date().toLocaleDateString("GB")
      }])
      .commit();

    const otherKeys = [1, 2, 3].filter(key => key !== shelfKey);
    console.log("otherKeys: ", otherKeys);
    const updatedShelf1 = shelves[otherKeys[0]-1]?.filter((book) => book.bookId !== book_id);
    const updatedShelf2 = shelves[otherKeys[1]-1]?.filter((book) => book.bookId !== book_id);
    console.log("updated: ", updatedShelf1, updatedShelf2);

    if (updatedShelf1) {
      console.log(shelfObject[otherKeys[0]]);
      await client.patch(userId)
      .set({ [shelfObject[otherKeys[0]]]: updatedShelf1 })
      .commit();
    }

    if (updatedShelf2) {
      console.log(shelfObject[otherKeys[1]]);
      await client.patch(userId)
      .set({ [shelfObject[otherKeys[1]]]: updatedShelf2 })
      .commit();
    }
  } catch (error) {
    console.log("Error adding book to shelf: ", error);
  }
}

// .unset([`blockedUsers[_ref=="${toUnBlockId}"]`])