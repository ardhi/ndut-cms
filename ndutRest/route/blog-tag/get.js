module.exports = async function () {
  const alias = 'cms-blog-tag'
  const { handler, schema } = await this.ndutRest.helper.modelAsFindRoute({ alias })
  return { handler, schema }
}
