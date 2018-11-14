const axios = require('axios')

module.exports = context => {
  return new Promise(async (resolve, reject) => {
    let page = 0
    let posts = []
    const next = async () => {
      page++
      const url = `${process.env.SOURCE_URL}?page=${page}`
      context.log(`get-data - url - ${url} - start `)
      try {
        const { data } = await axios.get(url)
        context.log(`get-data - url - ${url} - posts - ${data.length} - success `)
        posts = posts.concat(data)
        await next()
      } catch (error) {
        if (error.response.data.code === 'rest_post_invalid_page_number') {
          context.log(`get-data - all posts retreived - finished `)
          resolve(posts)
        } else {
          context.log.error(`get-data - ${error} `)
          reject(error)
        }
      }
    }
    await next()
  })
}
