// 获取私信详细历史记录
module.exports = (query, request) => {
    const data = {
        limit: query.limit || 3,
        offset: query.offset || 0,
        total: true,
        time: -1,
        userId: query.userId,
    }

    return request(
        'POST', `http://music.163.com/weapi/msg/private/history`, data,
        {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
    )
}