/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './docs/.vitepress/theme/**/*.{vue,js,ts}'
    ],
    theme: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
}
