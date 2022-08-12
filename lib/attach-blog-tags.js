module.exports = async function (result = {}) {
  const { _ } = this.ndut.helper
  const isArray = _.isArray(result)
  if (!isArray) result = [result]
  const blogTags = await this.ndutApi.helper.find({
    model: 'CmsBlogTagBlog',
    params: { where: { blogId: { inq: _.map(result, 'id') } } }
  })
  const tags = await this.ndutApi.helper.find({
    model: 'CmsBlogTag',
    params: { where: { id: { inq: _.map(blogTags.data, 'tagId') } } }
  })
  blogTags.data = _.map(blogTags.data, r => {
    const t = _.find(tags.data, { id: r.tagId }) || {}
    r.tagName = t.name
    return r
  })
  result = _.map(result, d => {
    const tags = _.filter(blogTags.data, { blogId: d.id })
    d.tags = _.map(tags, 'tagName')
    return d
  })
  return isArray ? result : result[0]
}
