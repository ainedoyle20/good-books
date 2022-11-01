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
      name: 'creator',
      title: 'Creator',
      type: 'postedBy',
    },
    {
      name: 'groupId',
      title: 'Group Id',
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
      of: [{
        type: 'reference',
        to: [{ type: 'user' }]
      }],
    },
    {
      name: 'contributions',
      title: 'Contributions',
      type: 'array',
      of: [{ type: 'datedMessages' }],
    },
  ]
}