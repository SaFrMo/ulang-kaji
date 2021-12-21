import { defineComponent } from 'vue'
import { lessons } from '../content'
import { FlashCardPracticeZone } from '../components/flashCardPracticeZone'

export const frontPage = defineComponent({
    setup() {
        // All cards
        // ====================
        const allCards = lessons.flatMap((lesson) => lesson.cards)

        // Render function
        // ====================
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
                {/* practice */}
                <FlashCardPracticeZone pool={allCards} />
            </section>
        )
    },
})
