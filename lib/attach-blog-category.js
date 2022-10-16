module.exports = async function (result = {}) {
  const { _ } = this.ndut.helper
  const isArray = _.isArray(result)
  if (!isArray) result = [result]
  const cats = await this.ndutApi.helper.dbCall({
    method: 'find',
    model: 'CmsBlogCategory',
    params: { where: { id: { inq: _.map(result, 'categoryId') } } }
  })
  result = _.map(result, d => {
    const cat = _.find(cats, { id: d.categoryId })
    if (cat) d.category = cat.name
    return d
  })
  return isArray ? result : result[0]
}
