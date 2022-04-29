module.exports = {
  handler: async function (request, reply) {
    const { mime } = this.ndut.helper
    if (!['cms-blog'].includes(request.params.model)) this.Boom.notFound('resourceNotFound')
    request.silentOnError = true // TODO: put on config and attach on preHandler
    const { file, stream } = await this.ndutApi.helper.handleAttachment({
      model: request.params.model,
      id: request.params.id,
      column: request.params.column,
      file: request.params.file
    })
    if (request.query.inline) reply.header('Content-Type', mime.getType(file))
    reply.send(stream)
  }
}
