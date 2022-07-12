module.exports = async function () {
  const alias = 'cms-blog-category'
  const { handler, schema } = await this.ndutRest.helper.modelAsFindRoute({ alias })
  return { handler, schema }
}
