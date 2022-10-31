export default {
  name: 'messagedUser',
  title: 'Messaged User',
  type: 'document',
  fields: [
    {
      name: 'messageFriend',
      title: 'Message Friend',
      type: 'reference',
      to: [{ type: 'user' }]
    },
    {
      name: 'datedMessages',
      title: 'Dated Messages',
      type: 'array',
      of: [{ type: 'datedMessages' }],
    },
  ]
}
