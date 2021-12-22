import { defineComponent, provide } from 'vue'
import './app.scss'
import { LOCAL_CONFIG_KEY } from './utils'

export default defineComponent({
    setup() {
        // Ensure local storage
        // ====================
        if (!localStorage.getItem(LOCAL_CONFIG_KEY)) {
            localStorage.setItem(
                LOCAL_CONFIG_KEY,
                JSON.stringify({
                    cardStats: [],
                    flaggedCards: [],
                } as BM.LocalStorageConfig)
            )
        }

        const defaultProfile: BM.LocalStorageConfig = {
            cardStats: [],
            flaggedCards: [],
        }
        const profile = {
            ...defaultProfile,
            ...JSON.parse(localStorage.getItem(LOCAL_CONFIG_KEY)!),
        }
        provide('profile', profile)

        // Render function
        // ====================
        return () => (
            <main class="app">
                <h1>
                    <router-link to="/">Bahasa Melayu Practice</router-link>
                </h1>

                <router-view />
            </main>
        )
    },
})
