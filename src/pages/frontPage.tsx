import { defineComponent } from 'vue'
import { allTags, lessons } from '../content'
import { FlashCardPracticeZone } from '../components/flashCardPracticeZone'
import { camelCase } from 'lodash'

export const frontPage = defineComponent({
    setup() {
        // All cards
        // ====================
        const allCards = lessons.flatMap((lesson) => lesson.cards)

        // Render function
        // ====================
        return () => (
            <section>
                {/* Classes */}
                <h2>Kelas</h2>
                <ol>
                    {lessons.map((lesson) => (
                        <li class="lesson">
                            <router-link to={`/lesson/${lesson.id}`}>
                                {lesson.name}
                            </router-link>
                        </li>
                    ))}
                </ol>

                {/* Tags */}
                <h2>Tags</h2>
                <ul>
                    {allTags.map((tag) => (
                        <li>
                            <router-link to={`/tag?tag=${tag}`}>
                                {tag}
                            </router-link>
                        </li>
                    ))}
                </ul>

                {/* Flagged */}
                <h2>Misc</h2>
                <router-link to="/flagged">Flagged cards</router-link>

                {/* Practice */}
                <FlashCardPracticeZone pool={allCards} />
            </section>
        )
    },
})
