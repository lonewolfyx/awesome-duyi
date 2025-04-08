export interface BiliBiliChannel {
    mid: number
    alias: string
    name: string
    url: string
}

export interface DouYinChannel {
    uid: string
    alias: string
    name: string
    url: string
}

export interface UserList {
    id: string
    mid?: number
    type: 'douyin' | 'bilibili'
    name: string
    url: string
}
