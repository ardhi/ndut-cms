module.exports = async function () {
  const alias = 'cms-blog-category'
  const query = { status: 'PUBLISHED' }
  const { handler, schema } = await this.ndutRest.helper.modelAsListRoute({ alias, query })
  return { handler, schema }
}
