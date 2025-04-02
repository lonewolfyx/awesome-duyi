import { cwd } from 'node:process'
import { resolve } from 'node:path'
import fs from 'node:fs'
import { user, type UserList } from '@/user.ts'
import { platformType } from '@/constant.ts'

const readmePath = resolve(cwd(), `./README.md`)
const writeContent = (content: string) => {
	fs.writeFileSync(readmePath, content, {
		encoding: 'utf8',
		flag: 'a'
	})
}

const content = [
	'<div align="center">',
	'    <img src="static/logo.jpeg" alt="渡一视频集合" width="150" height="150" border-radius="50% 10%"/>',
	'</div>',
	'<h1 align="center">📰 渡一视频集合</h1>',
	'<p align="center">是一份专注于收集全网渡一教学视频的集合。以简洁易懂的形式呈现，快速掌握关键信息，节省查阅时间。</p>',
	'',
	'## 📋 简介',
	'',
	'此集合目前涵盖以下账户内容：',
	''
]

// 初始化内容
fs.writeFileSync(readmePath, '')

content.forEach((item: string) => {
	writeContent(`${item}\n`)
})

user.forEach((item: UserList) => {
	writeContent(`- [${platformType[item.type]} - ${item.name}](${item.url})\n`)
})
writeContent(`\n`)

writeContent('> 若有推荐的优质账户可进行 `issues` 提交\n')
writeContent(`\n`)

user.forEach((item: UserList) => {
	writeContent(`### ${platformType[item.type]} - ${item.name}\n`)
	writeContent(`\n`)
	const content = JSON.parse(fs.readFileSync(resolve(cwd(), `./data/${item.id}.json`), 'utf-8'))
	content.forEach((row: any) => {
		writeContent(`- [${row.title}](${row.url}) - ${row.time}\n`)
	})
	writeContent(`\n`)
})
