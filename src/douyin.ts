import { chromium } from 'playwright'
import * as fs from 'node:fs'
import { cwd } from 'node:process'
import { resolve } from 'node:path'
import dayjs from 'dayjs'
import { user, type UserList } from '@/user.ts'

export const getDouYinNewData = async (fileName: string, url: string) => {
    const browser = await chromium.launch({
        headless: false
    })
    const context = await browser.newContext()
    const page = await context.newPage()

    const filePath = resolve(cwd(), `./data/${fileName}.json`)

    page.on('response', async (response) => {
        if (response.url().includes('aweme/v1/web/aweme/post')) {
            const text = await response.text()
            if (text && JSON.parse(text)?.aweme_list?.[0]) {
                const video = JSON.parse(text)['aweme_list'][0]
                const lastTime = video.create_time

                const oldContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
                const firstContent = oldContent[0]
                const contentLastTime = dayjs(firstContent.time).valueOf() / 1e3

                if (contentLastTime < lastTime) {
                    oldContent.unshift({
                        title: video.item_title || video.desc.split('\n')[0],
                        url: `https://www.douyin.com/video/${video.aweme_id}`,
                        time: dayjs.unix(lastTime).format('YYYY-MM-DD HH:mm:ss')
                    })
                    fs.writeFileSync(filePath, JSON.stringify(oldContent), {
                        encoding: 'utf8',
                        flag: 'w'
                    })
                }
            }
        }
    })

    await page.goto(url)

    // 等待登录框出现
    await page.waitForSelector('._CwbZHXv', { timeout: 20000 })
    // 关闭登录框
    await page.locator('._CwbZHXv > svg').click()

    // 等待 2 秒后关闭
    setTimeout(async () => {
        await context.close()
        await browser.close()
    }, 2000)
}

async function main(users: UserList[]) {

    for (const item of users) {
        if (item.type === 'douyin') {
            // 计算当前这次的延迟
            const delay = 2000

            // 等待当前的总延迟时间
            await new Promise(resolve => setTimeout(resolve, delay))

            await getDouYinNewData(item.id, item.url)
        }
    }
}

(async () => {
    await main(user)
})()
