import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Awesome DuYi',
	description: 'A VitePress Site',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '视频集', link: '/videos' },
			{ text: '代码集', link: '/codes' },
            { text: '赞助', link: '/sponsor'}
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
			{ icon: 'github', link: 'https://github.com/lonewolfyx/awesome-duyi' }]
	}
})
