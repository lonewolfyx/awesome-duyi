import { biliBiliUser } from '@/user.ts'
import { getBiliBili } from '@/bilibili'
;(async () => {
    for (const item of biliBiliUser) {
        // 计算当前这次的延迟
        const delay = 2000

        // 等待当前的总延迟时间
        await new Promise((resolve) => setTimeout(resolve, delay))

        await getBiliBili(item)
    }
})()
