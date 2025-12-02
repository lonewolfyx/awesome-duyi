import type { BaseChannel, ChannelType } from '../../types/types'
import { defineConfig } from 'vitepress'
import { biliBiliUser, douYinUser } from '../../src/user'

function generatorNav(channel: BaseChannel[], type: ChannelType) {
    return channel.map((item: BaseChannel) => ({
        text: item.name,
        link: `/${type}/${item.vpName}`,
    }))
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Awesome DuYi',
    description: '渡一教学相关的精彩精选视频、代码集',
    themeConfig: {
        logo: '/logo.jpeg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            {
                text: '抖音专辑',
                link: '/douyin/salary_increase_course',
                activeMatch: '/douyin/',
            },
            { text: '哔哩哔哩专辑', link: '/bilibili/institution' },
            {
                text: '代码专辑',
                link: '/code',
                activeMatch: '/code/',
            },
            // { text: '赞助', link: '/sponsor' }
        ],

        sidebar: {
            '/douyin/': [
                {
                    text: '抖音专辑',
                    items: generatorNav(douYinUser, 'douyin'),
                },
            ],
            '/bilibili/': [
                {
                    text: '哔哩哔哩专辑',
                    items: generatorNav(biliBiliUser, 'bilibili'),
                },
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/lonewolfyx/awesome-duyi' },
        ],
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium',
            },
        },
    },
})
