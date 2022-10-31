export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      name: 'readShelf',
      title: 'Read Shelf',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'bookDetails'}]
      }],
    },
    {
      name: 'readingShelf',
      title: 'Currently Reading Shelf',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'bookDetails'}]
      }],
    },
    {
      name: 'wantToReadShelf',
      title: 'Want To Read Shelf',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'bookDetails'}]
      }],
    },
    {
      name: 'friends',
      title: 'Friends',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'user' }]
      }]
    },
    {
      name: 'requestedFriends',
      title: 'Requested Friends',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'user' }]
      }]
    },
    {
      name: 'friendRequests',
      title: 'friendRequests',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'user' }]
      }]
    },
    {
      name: 'groups',
      title: 'Groups',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'group'}]
      }],
    },
    {
      name: 'messagedUsers',
      title: 'Messaged Users',
      type: 'array',
      of: [{ type: 'messagedUser'}]
    },
    {
      name: 'readingChallange',
      title: 'Reading Challange',
      type: 'number'
    },
  ]
}