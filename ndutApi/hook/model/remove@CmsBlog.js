module.exports = {
  after: async function ({ model, body = {}, filter, result = {} }) {
    const { _ } = this.ndut.helper
    await this.ndutApi.helper.remove({
      model: 'CmsBlogTagBlog',
      params: { blogId: result.id },
      filter
    })
  }
}
