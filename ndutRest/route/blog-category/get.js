module.exports = async function () {
  const alias = 'cms-blog-category'
  const { handler, schema } = await this.ndutRest.helper.modelAsListRoute({ alias })
  return { handler, schema }
}
