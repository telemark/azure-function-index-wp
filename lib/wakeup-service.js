const axios = require('axios')

module.exports = async context => {
  context.log(`Wakeup service - ${process.env.SEARCH_SERVICE_URL} - start`)
  try {
    const { data } = await axios.get(process.env.SEARCH_SERVICE_URL)
    context.log(`Wakeup service - ${process.env.SEARCH_SERVICE_URL} - success`)
    return data.includes('MIT')
  } catch (error) {
    context.log(`Wakeup service - ${process.env.SEARCH_SERVICE_URL} - ${error}`)
    return false
  }
}
