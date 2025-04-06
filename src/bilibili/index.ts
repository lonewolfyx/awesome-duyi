import type { BiliBiliChannel } from '#/types.ts'
import axios from 'axios'
import { getWebId } from '@/bilibili/webid.ts'
import { getBiliBiliCookies } from '@/bilibili/cookie.ts'
import { getBiliBiliRequestRid } from '@/bilibili/rid.ts'

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
		referer: `https://space.bilibili.com/${channel.id}/video`
	}

	const cookies = await getBiliBiliCookies()
	const webId = await getWebId(channel.id.toString())
	const now = Math.round(Date.now() / 1e3)

	const queryParams = {
		mid: channel.id,
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
		w_webid: webId,
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
	videoList.map((row: any) => {
		console.log(row.title)
	})
	return channel.id
}
;(async () => {
	console.log(
		await getBiliBili({
			id: 384876532,
			name: '',
			avatar: ''
		})
	)
})()
