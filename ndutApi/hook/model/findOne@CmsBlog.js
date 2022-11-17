const attachBlogTags = require('../../../lib/attach-blog-tags')
const attachBlogCategory = require('../../../lib/attach-blog-category')

module.exports = {
  after: async function ({ result = {} }) {
    const { _ } = this.ndut.helper
    const tags = await attachBlogTags.call(this, result)
    const category = await attachBlogCategory.call(this, result)
    return _.merge(tags, category)
  }
}
