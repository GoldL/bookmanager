const {
  mysql
} = require('../qcloud')

module.exports = async ctx => {
  const {
    bookid
  } = ctx.request.query
  const comments = await mysql('comments').select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    .where('bookid', bookid)
  ctx.state.data = {
    list: comments.map(comment => {
      const info = JSON.parse(comment.user_info)
      return Object.assign({}, comment, {
        user_info: {
          title: info.nickName,
          image: info.avatarUrl
        }
      })
    })
  }
}
