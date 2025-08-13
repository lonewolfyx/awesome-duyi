import { douYinUser } from '@/user.ts'
import { getDouYinData } from '@/douyin'
;(async () => {
    for (const item of douYinUser) {
        // 计算当前这次的延迟
        const delay = 2000

        // 等待当前的总延迟时间
        await new Promise((resolve) => setTimeout(resolve, delay))

        await getDouYinData(item)
    }
    // await getDouYinData({
    //     uid: 'MS4wLjABAAAAeIIkCgELXG6XdUxuE9nQ6W4AfS-aoPFbtmnBL8ytcYtBSyurgePBYZXJpB0LJBCT',
    //     alias: 'txk',
    //     name: '渡一前端提薪课',
    //     vpName: 'salary_increase_course',
    //     url: 'https://www.douyin.com/user/MS4wLjABAAAAeIIkCgELXG6XdUxuE9nQ6W4AfS-aoPFbtmnBL8ytcYtBSyurgePBYZXJpB0LJBCT'
    // })
})()
