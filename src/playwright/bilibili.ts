import { chromium } from 'playwright'
import fs from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import dayjs from 'dayjs'

export const getBiliBiliDataList = async (fileName: string, url: string) => {
	const browser = await chromium.launch({
		channel: 'chrome',
		headless: false
	})
	const context = await browser.newContext()
	const page = await context.newPage()

	const filePath = resolve(cwd(), `./data/${fileName}.json`)
	fs.writeFileSync(filePath, '[\n', {
		encoding: 'utf8',
		flag: 'a'
	})

	// 监听请求数据
	page.on('response', async (response) => {
		if (response.url().includes('x/space/wbi/arc/search')) {
			const text = await response.text()
			if (text && JSON.parse(text)?.data) {
				// console.log('响应内容:', JSON.parse(text)['data']['list']['vlist'])
				const vList = JSON.parse(text)['data']['list']['vlist']
				vList.forEach((item: any) => {
					const item_title = item.title
					const time = dayjs.unix(item.created).format('YYYY-MM-DD HH:mm:ss')
					const content = `{"title":"${item_title}","url":"https://www.bilibili.com/${item.bvid}","time":"${time}","cover":"${item.pic}"},\n`
					fs.writeFileSync(filePath, content, {
						encoding: 'utf8',
						flag: 'a'
					})
				})
			}
		}
	})

	await page.goto(url)

	await page.waitForSelector('.be-pager-next', { timeout: 20000 })

	// 获取分页的数量
	// 获取 .be-pager-total 元素的内容
	const totalText = (await page.textContent('.be-pager-total')) || ''
	// 使用正则提取数字
	const match = totalText.match(/共\s*(\d+)\s*页/)

	const pages = Number(match?.[1]) || 0
	console.log(`总共页面：${pages}`)

	for (let i = 1; i < pages; i++) {
		console.log(`正在执行第 ${i} 次翻页...`)
		// 等待 "下一页" 按钮出现
		const nextPageButton = await page.waitForSelector('.be-pager-next', { timeout: 10000 })
		// 如果按钮不存在或者被禁用，则跳出循环
		if (!nextPageButton) {
			console.log('未找到下一页按钮，结束循环')
			continue
		}

		// 触发 end 键盘事件，页面滚动至底部
		await page.keyboard.press('End')
		// 停顿2秒
		await page.waitForTimeout(2000)
		// 触发 下一页 按钮事件
		await page.getByRole('listitem', { name: '下一页' }).click()
		// 额外等待，确保新页面加载完成
		await page.waitForTimeout(3000)
	}

	fs.writeFileSync(resolve(cwd(), `./data/${fileName}.json`), ']\n', {
		encoding: 'utf8',
		flag: 'a'
	})

	// 等待 2 秒后关闭
	setTimeout(async () => {
		await context.close()
		await browser.close()
	}, 2000)
}

export const getBiliBiliNewData = async (fileName: string, url: string) => {
	const browser = await chromium.launch({
		channel: 'chrome',
		headless: false
	})
	const context = await browser.newContext({
		userAgent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
	})
	const page = await context.newPage()

	const filePath = resolve(cwd(), `./data/${fileName}.json`)

	page.on('response', async (response) => {
		if (response.url().includes('x/space/wbi/arc/search')) {
			const text = await response.text()
			if (text && JSON.parse(text)?.data) {
				console.log(JSON.parse(text))
				const vList = JSON.parse(text)['data']['list']['vlist']
				const row = vList[0]
				const oldContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
				const firstContent = oldContent[0]
				const lastTime = row.created
				const contentLastTime = dayjs(firstContent.time).valueOf() / 1e3
				if (contentLastTime < lastTime) {
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
				}
			}
		}
	})

	await page.goto(url)

	// 等待 2 秒后关闭
	setTimeout(async () => {
		await context.close()
		await browser.close()
	}, 2000)
}

// await getBiliBiliDataList('qdjjk', 'https://space.bilibili.com/174874061/video')
// await getBiliBiliDataList('jybckt', 'https://space.bilibili.com/383573378/video')
// await getBiliBiliDataList('txkjm', 'https://space.bilibili.com/3537111135291562/video')
// await getBiliBiliDataList('webqdkf', 'https://space.bilibili.com/384876532/video')
// await getBiliBiliDataList('qdbxk', 'https://space.bilibili.com/3494367522195464/video')
// await getBiliBiliNewData('qdjjk', 'https://space.bilibili.com/174874061/video')
