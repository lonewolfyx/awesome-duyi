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
            {
                text: '抖音专辑',
                link: '/douyin/salary_increase_course',
                activeMatch: '/douyin/'
            },
            { text: '哔哩哔哩专辑', link: '/bilibili/institution' },
            {
                text: '代码专辑',
                link: '/code',
                activeMatch: '/code/'
            }
            // { text: '赞助', link: '/sponsor' }
        ],

        sidebar: {
            '/douyin/': [
                {
                    text: '抖音专辑',
                    items: [
                        { text: '渡一前端提薪课', link: '/douyin/salary_increase_course' },
                        { text: '渡一Web前端学习频道', link: '/douyin/learning_channel' },
                        { text: '渡一前端教科书', link: '/douyin/textbook' },
                        { text: '渡一前端必修课', link: '/douyin/compulsory_course' },
                        { text: '渡一前端讲书频道', link: '/douyin/book_talk_channel' },
                        { text: '渡一前端代码优化CodeReview', link: '/douyin/code_review' }
                    ]
                }
            ],
            '/bilibili/': [
                {
                    text: '哔哩哔哩专辑',
                    items: [
                        { text: '渡一机构', link: '/bilibili/institution' },
                        { text: '渡一教育-前端进阶课', link: '/bilibili/front_end_advanced' },
                        { text: '渡一教育编程课堂', link: '/bilibili/programming' },
                        { text: '渡一前端提薪空间', link: '/bilibili/salary_increase_course' },
                        { text: '渡一教育-Web前端开发', link: '/bilibili/front_dev' },
                        { text: '渡一前端必修课', link: '/bilibili/compulsory_course' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/lonewolfyx/awesome-duyi' }],
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        }
    }
})
