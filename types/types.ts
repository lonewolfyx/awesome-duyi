export interface BaseChannel {
    alias: string
    name: string
    vpName: string
    url: string
}

export type ChannelType = 'douyin' | 'bilibili'

export interface BiliBiliChannel extends BaseChannel {
    mid: number
}

export interface DouYinChannel extends BaseChannel {
    uid: string
}

export interface UserList {
    id: string
    mid?: number
    type: ChannelType
    name: string
    url: string
}
