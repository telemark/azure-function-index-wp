const axios = require('axios')
const generateToken = require('./generate-token')
const pkg = require('../package.json')

module.exports = async context => {
  const url = `${process.env.SEARCH_SERVICE_URL}/api/indexes/${process.env.SEARCH_SERVICE_INDEX}`
  const token = generateToken({ key: process.env.SEARCH_SERVICE_JWT_KEY, payload: { system: pkg.name } })
  context.log(`delete-index - ${url} - start`)
  axios.defaults.headers.common['Authorization'] = token
  try {
    const { data } = await axios.delete(url)
    context.log(`delete-index - ${process.env.SEARCH_SERVICE_INDEX} - success`)
    return data
  } catch (error) {
    context.log.error(`delete-index - ${error}`)
    throw error
  }
}
