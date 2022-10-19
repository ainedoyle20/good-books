export default {
  name: 'discussion',
  title: 'Discussion',
  type: 'document',
  fields: [
    {
      name: 'discussionName',
      title: 'Discussion Name',
      type: 'string',
    },
    {
      name: 'creatorId',
      title: 'Creator Id',
      type: 'string',
    },
    {
      name: 'groupName',
      title: 'Group Name',
      type: 'string',
    },
    {
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [{ type: 'savedFriends' }],
    },
    {
      name: 'contributions',
      title: 'Contributions',
      type: 'array',
      of: [{ type: 'message' }],
    },
  ]
}