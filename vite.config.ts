import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

import { lessons } from './src/content'
const lessonMap = lessons.reduce((acc, curr) => {
    acc[`index${curr.id}`] = `/lesson/${curr.id}/index.html`
    return acc
}, {})

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), jsx()],
    build: {
        rollupOptions: {
            input: {
                main: '/index.html',
                ...lessonMap,
            },
        },
    },
})
