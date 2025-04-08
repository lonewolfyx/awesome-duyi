import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Awesome DuYi',
    description: '渡一教学相关的精彩精选视频、代码集',
    themeConfig: {
        logo: '/logo.jpeg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '抖音专辑', link: '/douyin' },
            { text: '哔哩哔哩专辑', link: '/bilibili' },
            { text: '代码专辑', link: '/code' }
            // { text: '赞助', link: '/sponsor' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/lonewolfyx/awesome-duyi' }
        ],
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        }
    }
})
