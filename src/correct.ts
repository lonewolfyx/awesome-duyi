import { biliBiliUser } from '@/user.ts'
import { getBiliBiliDataList } from '@/playwright/bilibili.ts'

(async () => {
    for (const { alias, url } of douYinUser) {
        // 计算当前这次的延迟
        const delay = 2000

        // 等待当前的总延迟时间
        await new Promise((resolve) => setTimeout(resolve, delay))

        await getDouYinNewData(alias, url)
    }


    for (const { alias, url } of biliBiliUser) {
        // 计算当前这次的延迟
        const delay = 2000

        // 等待当前的总延迟时间
        await new Promise((resolve) => setTimeout(resolve, delay))

        await getBiliBiliDataList(alias, url)
    }
    // await getBiliBiliDataList('dyjg', 'https://space.bilibili.com/286614549/upload/video')
})()
