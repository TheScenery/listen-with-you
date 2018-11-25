// 歌单详情

module.exports = (query, request) => {
    const data = {
        id: query.id,
        n: 1000,
        limit: 1000,
        total: true,
        offset: 0,
    }
    return request(
        'POST', `http://music.163.com/weapi/v3/playlist/detail`, data,
        {crypto: 'linuxapi', cookie: query.cookie, proxy: query.proxy}
    )
}