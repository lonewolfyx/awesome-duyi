import { user, type UserList } from '@/user.ts'
import { getBiliBiliDataList, getBiliBiliNewData } from '@/playwright/bilibili.ts'
import { getDouYinNewData } from '@/playwright/douyin.ts'

async function main(users: UserList[]) {
	for (const item of users) {
		if (item.type === 'douyin') {
			// 计算当前这次的延迟
			const delay = 2000

			// 等待当前的总延迟时间
			await new Promise((resolve) => setTimeout(resolve, delay))

			await getDouYinNewData(item.id, item.url)
		}

		if (item.type === 'bilibili') {
			// 计算当前这次的延迟
			const delay = 2000

			// 等待当前的总延迟时间
			await new Promise((resolve) => setTimeout(resolve, delay))

			// await getBiliBiliDataList(item.id, item.url)
			await getBiliBiliNewData(item.id, item.url)
		}
	}
}

;(async () => {
	await main(user)
})()
