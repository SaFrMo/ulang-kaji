import { createApp } from 'vue'
import App from './app'
import { createRouter, createWebHistory } from 'vue-router'

import { frontPage } from './pages/frontPage'
import { lessonPage } from './pages/lesson/_id'
import { TagPage } from './pages/tag'
import { FlaggedPractice } from './pages/flagged'
import { LowScoring } from './pages/lowScore'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: frontPage },
        { path: '/lesson/:id', component: lessonPage },
        { path: '/tag', component: TagPage },
        { path: '/flagged', component: FlaggedPractice },
        { path: '/low-score', component: LowScoring },
    ],
})

import { autoBlur } from 'auto-blur'
autoBlur('BUTTON')
autoBlur('A')

createApp(App).use(router).mount('#app')
