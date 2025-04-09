import fs from 'node:fs'
import { resolve } from 'node:path'

/**
 * 写入文件
 * @param path 文件路径
 * @param content 文件内容
 * @param cover 是否覆盖，默认 false
 */
export const write = (path: string, content: string, cover: boolean = false) => {
    fs.writeFileSync(path, content, {
        encoding: 'utf8',
        flag: cover ? 'w' : 'a'
    })
}

/**
 * 读取文件
 * @param path 文件路径
 */
export const read = (path: string) => {
    return fs.readFileSync(path, 'utf-8')
}
