const attachBlogTags = require('../../../lib/attach-blog-tags')
const attachBlogCategory = require('../../../lib/attach-blog-category')

module.exports = {
  before: async function ({ model, params, filter, options, columns }) {
    const { _ } = this.ndut.helper
    const qtag = _.get(params, 'where.tag')
    if (qtag) {
      delete params.where.tag
      const tag = await this.ndutApi.helper.dbCall({ method: 'find', model: 'CmsBlogTag', params: { where: { name: qtag }, limit: 1 } })
      const tagId = (tag[0] || {}).id || -1
      const blogTags = await this.ndutApi.helper.dbCall({ method: 'find', model: 'CmsBlogTagBlog', params: { where: { tagId } } })
      const tags = _.map(blogTags, 'blogId')
      params.where.id = { inq: tags }
    }
    const qcat = _.get(params, 'where.category')
    if (qcat) {
      delete params.where.category
      const cat = await this.ndutApi.helper.dbCall({ method: 'find', model: 'CmsBlogCategory', params: { where: { name: qcat }, limit: 1 } })
      const catId = (cat[0] || {}).id || -1
      params.where.categoryId = Number(qcat) === 0 ? 0 : catId
    }
  },
  after: async function ({ result = [] }) {
    const { _ } = this.ndut.helper
    const tags = await attachBlogTags.call(this, result)
    const category = await attachBlogCategory.call(this, result)
    return _.merge(tags, category)
  }
}
