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
                <h2>
                    Kelas {id}: {lesson.name}
                </h2>

                {lesson.pdfUrl && (
                    <div class="download">
                        <a href={lesson.pdfUrl} target="_blank">
                            PDF
                        </a>
                    </div>
                )}

                {/* Cards */}
                <dl>
                    {lesson.cards.map((card) => (
                        <>
                            <dt>{card.bm}</dt>
                            <dd>{card.en}</dd>
                        </>
                    ))}
                </dl>

                {/* Practice */}
                <FlashCardPracticeZone pool={lesson.cards} />
            </section>
        )
    },
})
