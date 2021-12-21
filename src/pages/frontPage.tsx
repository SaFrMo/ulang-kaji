import { defineComponent } from 'vue'
import { lessons } from '../content'

export const frontPage = defineComponent({
    setup() {
        return () => (
            <section>
                <h2>Lessons</h2>
                {/* list all lesson pages */}
                <ol>
                    {lessons.map((lesson, i) => (
                        <li class="lesson">
                            <router-link to={`/lesson/${lesson.id}`}>
                                {lesson.name}
                            </router-link>
                        </li>
                    ))}
                </ol>
            </section>
        )
    },
})
