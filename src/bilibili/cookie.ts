import axios from 'axios'

export const getBiliBiliCookies = async () => {
    const result = await axios.get('https://api.bilibili.com/x/frontend/finger/spi', {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
        }
    })

    return result?.data?.data
}
