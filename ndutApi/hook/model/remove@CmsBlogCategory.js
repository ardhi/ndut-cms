module.exports = {
  after: async function ({ model, body = {}, filter, result = {} }) {
    const { _ } = this.ndut.helper
    await this.ndutApi.helper.update({
      model: 'CmsBlog',
      params: { categoryId: result.id },
      body: { categoryId: 0 },
      filter
    })
  }
}
