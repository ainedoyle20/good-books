export default {
  name: 'group',
  title: 'Group',
  type: 'document',
  fields: [
    {
      name: 'groupName',
      title: 'Group Name',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Creator',
      type: 'postedBy',
    },
    {
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'user' }]
      }],
    },
    {
      name: 'removedMembers',
      title: 'Removed Members',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'user' }]
      }],
    },
    {
      name: 'discussions',
      title: 'Discussions',
      type: 'array',
      of: [{ 
        type: 'reference',
        to: [{ type: 'discussion'}]
      }],
    },
    {
      name: 'public',
      title: 'Public',
      type: 'boolean',
    }
  ]
}