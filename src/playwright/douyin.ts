import { chromium } from 'playwright'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import fs, { readFileSync, writeFileSync } from 'node:fs'
import dayjs from 'dayjs'

export const getDouYinNewData = async (fileName: string, url: string) => {
	const browser = await chromium.launch({
		headless: false
	})
	const cookiePath = resolve(cwd(), 'storageState.json')
	console.log(cookiePath)
	const context = await browser.newContext({
		storageState: JSON.parse(readFileSync(cookiePath, 'utf-8'))
	})
	const page = await context.newPage()

	const filePath = resolve(cwd(), `./data/${fileName}.json`)
	fs.writeFileSync(filePath, '[\n', {
		encoding: 'utf8',
		flag: 'w'
	})

	page.on('response', async (response) => {
		if (response.url().includes('aweme/v1/web/aweme/post')) {
			const text = await response.text()
			if (text && JSON.parse(text)?.aweme_list) {
				const video = JSON.parse(text)['aweme_list']

				video.forEach((row: any) => {
					const title = row.item_title || row.desc.split('\n')[0]
					const url = `https://www.douyin.com/video/${row.aweme_id}`
					const time = dayjs.unix(row.create_time).format('YYYY-MM-DD HH:mm:ss')
					const cover = row.video?.dynamic_cover?.url_list[0] || row.video?.origin_cover?.url_list[0] || ''
					const content = `{"title":"${title}", "url":"${url}","time":"${time}","cover":"${cover}"},\n`
					fs.writeFileSync(filePath, content, {
						encoding: 'utf8',
						flag: 'a'
					})
				})
			}

			// if (text && JSON.parse(text)?.aweme_list?.[0]) {
			//     console.log(text)
			//     const video = JSON.parse(text)['aweme_list'][0]
			//     const lastTime = video.create_time
			//
			//     const oldContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
			//     const firstContent = oldContent[0]
			//     const contentLastTime = dayjs(firstContent.time).valueOf() / 1e3
			//
			//     if (contentLastTime < lastTime) {
			// const cover = row.video?.dynamic_cover?.url_list[0] || row.video?.origin_cover?.url_list[0] || ''
			//     	oldContent.unshift({
			//     		title: video.item_title || video.desc.split('\n')[0],
			//     		url: `https://www.douyin.com/video/${video.aweme_id}`,
			//     		time: dayjs.unix(lastTime).format('YYYY-MM-DD HH:mm:ss')
			//     	})
			//     	fs.writeFileSync(filePath, JSON.stringify(oldContent), {
			//     		encoding: 'utf8',
			//     		flag: 'w'
			//     	})
			//     }
			// }
		}
	})

	await page.goto(url)

	// 等待登录框出现
	// await page.waitForSelector('._CwbZHXv', { timeout: 20000 })

	// // 关闭登录框
	// await page.locator('._CwbZHXv > svg').click()
	//

	let status = true
	while (status) {
		const pageText = await page.locator('.B_mbw29p').count()
		console.log(pageText)
		await page.waitForTimeout(2000)
		// 触发 end 键盘事件，页面滚动至底部
		await page.keyboard.press('End')
		if (pageText) {
			status = false
		}
	}

	fs.writeFileSync(filePath, ']\n', {
		encoding: 'utf8',
		flag: 'a'
	})

	const newCookies = await context.storageState()
	writeFileSync(cookiePath, JSON.stringify(newCookies, null, 2))

	// 等待 2 秒后关闭
	setTimeout(async () => {
		await context.close()
		await browser.close()
	}, 2000)
}
