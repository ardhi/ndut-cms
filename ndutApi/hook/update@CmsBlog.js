const attachBlogTags = require('../../lib/attach-blog-tags')
const attachBlogCategory = require('../../lib/attach-blog-category')

module.exports = {
  before: async function ({ body = {}, filter = {} }) {
    const { _ } = this.ndut.helper
    if (body.category) {
      const resp = await this.ndutApi.helper.findOneOrCreate({
        model: 'CmsBlogCategory',
        body: { name: body.category },
        params: { where: { name: body.category } },
        filter
      })
      body.categoryId = _.get(resp, 'data.id')
    }
  },
  after: async function ({ model, body = {}, result = {}, filter = {} }) {
    const { _ } = this.ndut.helper
    if (body.tags && body.tags.length > 0) {
      const resp = await this.ndutApi.helper.remove({
        model: 'CmsBlogTagBlog',
        params: { blogId: result.id }
      })
    }
    for (const t of (body.tags || [])) {
      const resp = await this.ndutApi.helper.findOneOrCreate({
        model: 'CmsBlogTag',
        body: { name: t },
        params: { where: { name: t } },
        filter
      })
      await this.ndutApi.helper.create({
        model: 'CmsBlogTagBlog',
        body: { blogId: result.id, tagId: resp.data.id },
        filter
      })
    }
    const tags = await attachBlogTags.call(this, result)
    const category = await attachBlogCategory.call(this, result)
    return _.merge(tags, category)
  }
}
