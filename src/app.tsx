import { defineComponent } from 'vue'
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
                    flaggedCards: [],
                } as BM.LocalStorageConfig)
            )
        }

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
