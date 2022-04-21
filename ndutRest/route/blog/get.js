module.exports = async function () {
  const alias = 'cms-blog'
  const query = { status: 'PUBLISHED' }
  const { handler, schema } = await this.ndutRest.helper.modelAsListRoute({ alias, query })
  return { handler, schema }
}
