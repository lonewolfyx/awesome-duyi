export const getTTWid = async () => {
    const result = await fetch('https://ttwid.bytedance.com/ttwid/union/register/', {
        method: 'post',
        body: JSON.stringify({
            region: 'cn',
            aid: 1768,
            needFid: false,
            service: 'www.ixigua.com',
            migrate_info: { ticket: '', source: 'node' },
            cbUrlProtocol: 'https',
            union: true
        }),
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            Referer: 'https://www.douyin.com/'
        }
    })
    const ttwid = result.headers.get('set-cookie') as string
    const content = ttwid.split(';').map((item) => item.trim())?.[0] as string
    console.log(content.split('=')?.[1])
}
