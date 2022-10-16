module.exports = async function (result = {}) {
  const { _ } = this.ndut.helper
  const isArray = _.isArray(result)
  if (!isArray) result = [result]
  let blogTags = await this.ndutApi.helper.dbCall({
    method: 'find',
    model: 'CmsBlogTagBlog',
    params: { where: { blogId: { inq: _.map(result, 'id') } } }
  })
  const tags = await this.ndutApi.helper.dbCall({
    method: 'find',
    model: 'CmsBlogTag',
    params: { where: { id: { inq: _.map(blogTags.data, 'tagId') } } }
  })
  blogTags = _.map(blogTags, r => {
    const t = _.find(tags, { id: r.tagId }) || {}
    r.tagName = t.name
    return r
  })
  result = _.map(result, d => {
    const tags = _.filter(blogTags, { blogId: d.id })
    d.tags = _.map(tags, 'tagName')
    return d
  })
  return isArray ? result : result[0]
}
