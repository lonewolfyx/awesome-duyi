import type { BiliBiliChannel, DouYinChannel } from '#/types.ts'
import fs from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { platformType } from '@/constant.ts'
import { biliBiliUser, douYinUser } from '@/user.ts'
import { write } from '@/util.ts'

const readmePath = resolve(cwd(), `./README.md`)
function writeContent(content: string) {
    write(readmePath, content)
}

function writeAccount<T extends DouYinChannel | BiliBiliChannel>(account: T[], platform: string) {
    account.forEach((item: T) => {
        writeContent(`- [${platform} - ${item.name}](${item.url})\n`)
    })
}

function writeVideos<T extends DouYinChannel | BiliBiliChannel>(account: T[], platform: keyof typeof platformType) {
    account.forEach((item: T) => {
        writeContent(`### ${platformType[platform]} - ${item.name}\n`)
        writeContent(`\n`)
        const content = JSON.parse(fs.readFileSync(resolve(cwd(), `./data/${item.alias}.json`), 'utf-8'))
        content.slice(0, 20).forEach((row: any) => {
            writeContent(`- [${row.title}](${row.url}) - ${row.time}\n`)
        })
        writeContent(`\n[查看更多](https://awesome-duyi.vercel.app/${platform}/${item.vpName}.html)\n`)
        writeContent(`\n`)
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
    '',
]

function main() {
    // 初始化内容
    write(readmePath, '', true)

    content.forEach((item: string) => {
        writeContent(`${item}\n`)
    })

    writeAccount(douYinUser, platformType.douyin)
    writeAccount(biliBiliUser, platformType.bilibili)

    writeContent(`\n`)

    writeContent('> 若有推荐的优质账户可进行 `issues` 提交\n')
    writeContent(`\n`)

    writeVideos(douYinUser, 'douyin')
    writeVideos(biliBiliUser, 'bilibili')
}

main()
