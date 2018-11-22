// 获取私信
module.exports = (query, request) => {
    const data = {
        getcounts: true,
        limit: query.limit || 20,
        offset: query.offset || 0,
        total: true,
        uid: query.uid,
    }

    return request(
        'POST', `http://music.163.com/weapi/msg/private/users`, data,
        {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
    )
}