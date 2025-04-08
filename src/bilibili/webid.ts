import axios from 'axios'

export const getWebId = async (id: string) => {
    const result = await axios.get(`https://space.bilibili.com/${id}/video`, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            Referer: 'https://space.bilibili.com/384876532/video',
            Origin: 'https://space.bilibili.com'
        }
    })

    const data = result.data
    const re = /<script id="__RENDER_DATA__" type="application\/json">(.*?)<\/script>/
    const renderData = data.match(re)?.[0]?.match(re)
    const access = JSON.parse(decodeURIComponent(renderData?.[1]))

    return access?.access_id
}
