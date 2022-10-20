export default {
  name: 'datedMessages',
  title: 'Dated Messages',
  type: 'document',
  fields: [
    {
      name: 'messageDate',
      title: 'Message Date',
      type: 'string',
    },
    {
      name: 'messages',
      title: 'Messages',
      type: 'array',
      of: [{ type: 'message'}],
    }
  ]
}