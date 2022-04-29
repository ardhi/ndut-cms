module.exports = {
  schema: {
    description: 'Get model\'s media files',
    tags: ['DB']
  },
  handler: async function (request, reply) {
    if (!['cms-blog'].includes(request.params.model)) this.Boom.notFound('resourceNotFound')
    return await this.ndutApi.helper.getAttachment({ model: request.params.model, id: request.params.id })
  }
}
