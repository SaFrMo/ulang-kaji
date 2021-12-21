import { defineComponent, onMounted, ref } from 'vue'
import { flaggedCards } from '../content'
import { FlashCardPracticeZone } from '../components/flashCardPracticeZone'

export const FlaggedPractice = defineComponent({
    name: 'FlaggedPractice',
    setup() {
        const flagged = ref([] as BM.FlashCard[])

        onMounted(() => {
            flagged.value = flaggedCards()
        })

        return () => (
            <main class="flagged">
                <h2>Flagged</h2>
                {flagged.value.length ? (
                    <FlashCardPracticeZone pool={flagged.value} />
                ) : (
                    'Nothing flagged!'
                )}
            </main>
        )
    },
})
