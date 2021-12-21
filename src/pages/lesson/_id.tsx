import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { lessons } from '../../content'
import './_id.scss'
import { FlashCardPracticeZone } from '../../components/flashCardPracticeZone'

export const lessonPage = defineComponent({
    setup() {
        const route = useRoute()
        const id = parseInt(route.params.id as string)
        const lesson = lessons.find((lesson) => lesson.id === id)!

        return () => (
            <section class="lesson">
                <h2>Lesson {id}</h2>

                {/* Cards */}
                <dl>
                    {lesson.cards.map((card) => (
                        <>
                            <dt>{card.bm}</dt>
                            <dd>{card.eng}</dd>
                        </>
                    ))}
                </dl>

                {/* Practice */}
                <FlashCardPracticeZone pool={lesson.cards} />
            </section>
        )
    },
})
