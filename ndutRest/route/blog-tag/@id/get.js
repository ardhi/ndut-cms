module.exports = async function () {
  const alias = 'cms-blog-tag'
  const query = { status: 'PUBLISHED' }
  const { handler, schema } = await this.ndutRest.helper.modelAsGetRoute({ alias, query })
  return { handler, schema }
}
