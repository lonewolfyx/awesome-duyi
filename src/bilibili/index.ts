import type { BiliBiliChannel } from '#/types.ts'
import axios from 'axios'
import { getBiliBiliCookies } from '@/bilibili/cookie.ts'
import { getBiliBiliRequestRid } from '@/bilibili/rid.ts'
import fs from 'node:fs'
import dayjs from 'dayjs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

export const getBiliBili = async (channel: BiliBiliChannel) => {
    const headers = {
        'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        origin: 'https://space.bilibili.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer: `https://space.bilibili.com/${channel.mid}/video`
    }

    const cookies = await getBiliBiliCookies()
    // const webId = await getWebId(channel.mid.toString())
    const now = Math.round(Date.now() / 1e3)

    const queryParams = {
        mid: channel.mid,
        ps: 30,
        tid: 0,
        pn: 1,
        web_location: 1550101,
        order_avoided: true,
        order: 'pubdate',
        keyword: '',
        platform: 'web',
        dm_img_list: '[]',
        dm_img_str: 'V2ViR0wgMS4wIChPcGVuR0wgRVMgMi4wIENocm9taXVtKQ',
        dm_cover_img_str:
            'QU5HTEUgKE5WSURJQSwgTlZJRElBIEdlRm9yY2UgR1RYIDE2NTAgKDB4MDAwMDFGOTEpIERpcmVjdDNEMTEgdnNfNV8wIHBzXzVfMCwgRDNEMTEpR29vZ2xlIEluYy4gKE5WSURJQS',
        dm_img_inter: '{"ds":[],"wh":[0,0,0],"of":[0,0,0]}',
        // w_webid: webId,
        wts: now.toString()
    }

    const w_rid = await getBiliBiliRequestRid(queryParams)

    const res = await axios.get('https://api.bilibili.com/x/space/wbi/arc/search', {
        headers: {
            ...headers,
            cookie: `buvid3=${cookies.b_3};buvid4=${cookies.b_4}`
        },
        params: {
            ...queryParams,
            w_rid
        }
    })

    const videoList = res?.data?.data?.list?.vlist
    // videoList.map((row: any) => {
    // 	console.log(row.title)
    // })
    //     const vList = JSON.parse(text)['data']['list']['vlist']

    const filePath = resolve(cwd(), `./data/${channel.alias}.json`)
    const row = videoList[0]
    const oldContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const firstContent = oldContent[0]
    const lastTime = row.created
    const contentLastTime = dayjs(firstContent.time).valueOf() / 1e3
    if (contentLastTime < lastTime) {
        console.log('有最新视频：', row.author, row.title)
        oldContent.unshift({
            title: row.title,
            url: `https://www.bilibili.com/${row.bvid}`,
            time: dayjs.unix(row.created).format('YYYY-MM-DD HH:mm:ss'),
            cover: row.pic
        })
        fs.writeFileSync(filePath, JSON.stringify(oldContent), {
            encoding: 'utf8',
            flag: 'w'
        })
    } else {
        console.log('暂无最新视频')
    }
}
// ;(async () => {
// 	await getBiliBili({
// 		mid: 3494367522195464,
// 		alias: 'qdbxk',
// 		name: '渡一前端必修课',
// 		url: 'https://space.bilibili.com/3494367522195464/video'
// 	})
// })()
