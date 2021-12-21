import { defineComponent } from 'vue'
import './app.scss'

export default defineComponent({
    setup() {
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
