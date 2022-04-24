module.exports = async function () {
  const alias = 'cms-blog-tag'
  const { handler, schema } = await this.ndutRest.helper.modelAsListRoute({ alias })
  return { handler, schema }
}
