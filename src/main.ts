import { createApp } from 'vue'
import App from './app'
import { createRouter, createWebHistory } from 'vue-router'

import { frontPage } from './pages/frontPage'
import { lessonPage } from './pages/lesson/_id'
import { TagPage } from './pages/tag'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: frontPage },
        { path: '/lesson/:id', component: lessonPage },
        { path: '/tag', component: TagPage },
    ],
})

createApp(App).use(router).mount('#app')
