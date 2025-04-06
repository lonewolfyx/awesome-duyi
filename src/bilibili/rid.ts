import { md5 } from '@lonewolfyx/utils'
import axios from 'axios'

const mixinKeyEncTab: number[] = [
	46,
	47,
	18,
	2,
	53,
	8,
	23,
	32,
	15,
	50,
	10,
	31,
	58,
	3,
	45,
	35,
	27,
	43,
	5,
	49,
	33,
	9,
	42,
	19,
	29,
	28,
	14,
	39,
	12,
	38,
	41,
	13,
	37,
	48,
	7,
	16,
	24,
	55,
	40,
	61,
	26,
	17,
	0,
	1,
	60,
	51,
	30,
	4,
	22,
	25,
	54,
	21,
	56,
	59,
	6,
	63,
	57,
	62,
	11,
	36,
	20,
	34,
	44,
	52
]

export const getImgFormatConfig = async (): Promise<{ imgKey: string; subKey: string }> => {
	const result = await axios.get('https://api.bilibili.com/x/web-interface/nav', {
		headers: {
			origin: 'https://space.bilibili.com',
			referer: 'https://space.bilibili.com/3546866377558183/video',
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
			Cookie: '__at_once=17312931139607680978;'
		}
	})

	const { img_url, sub_url } = result.data?.data?.wbi_img

	const getKeyFromURL = (url: string) => url.substring(url.lastIndexOf('/') + 1, url.length).split('.')[0]

	return {
		imgKey: getKeyFromURL(img_url) || '',
		subKey: getKeyFromURL(sub_url) || ''
	}
}
export const getPictureHashKey = (orig: string): string =>
	mixinKeyEncTab
		.map((n) => orig[n])
		.join('')
		.slice(0, 32)

export const getBiliBiliRequestRid = async (params: Record<string, unknown>): Promise<string> => {
	const wbiKeys = await getImgFormatConfig()
	const combinedKey = wbiKeys.imgKey + wbiKeys.subKey
	const hashKey = getPictureHashKey(combinedKey)

	// 处理并排序参数
	const sortedKeys = Object.keys(params).sort()
	const specialCharRegex = /[!'\(\)*]/g

	const encodedParams = sortedKeys
		.map((key) => {
			let value = params[key]

			// 处理字符串类型的值
			if (typeof value === 'string') {
				value = value.replace(specialCharRegex, '')
			}

			// 过滤无效值
			if (value === null || value === undefined) return null

			// 编码键值对
			return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
		})
		.filter((param): param is string => param !== null) // 类型守卫过滤

	const joinedParams = encodedParams.join('&')

	return md5(joinedParams + hashKey).toString()
}
