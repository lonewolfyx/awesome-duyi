import { resolve } from 'node:path'
import { cwd } from 'node:process'
import dayjs from 'dayjs'
import { biliBiliUser, douYinUser } from '@/user.ts'
import { read, write } from '@/util.ts'

function processUserChannels<T extends { alias: string, name: string, url: string, vpName: string }>(users: T[], folderName: string) {
    users.forEach((item: T) => {
        const dataFilePath = resolve(cwd(), `./data/${item.alias}.json`)
        const content = JSON.parse(read(dataFilePath))
        const docsPath = resolve(cwd(), `./docs/${folderName}/${item.vpName}.md`)
        const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

        // 写入标题和更新信息
        write(docsPath, `# ${item.name}\n\n`, true)
        write(docsPath, `<div class="tip custom-block">\n\n`)
        write(docsPath, `<p>更新时间：${updateTime}</p>\n\n`)
        write(docsPath, `地址 [${item.url}](${item.url})\n\n`)
        write(docsPath, `</div>\n\n`)

        // 写入内容
        content.forEach((row: any) => {
            write(docsPath, `- [${row.title}](${row.url}) - ${row.time}\n`)
        })
    })
}

processUserChannels(douYinUser, 'douyin')
processUserChannels(biliBiliUser, 'bilibili')
