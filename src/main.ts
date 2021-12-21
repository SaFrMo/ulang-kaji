import { createApp } from 'vue'
import App from './app'
import { createRouter, createWebHistory } from 'vue-router'

import { frontPage } from './pages/frontPage'
import { lessonPage } from './content/lesson/_id'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: frontPage },
        { path: '/lesson/:id', component: lessonPage },
    ],
})

createApp(App).use(router).mount('#app')
