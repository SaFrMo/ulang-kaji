import { defineComponent, onMounted, ref } from 'vue'
import { allCards } from '../content'
import { FlashCardPracticeZone } from '../components/flashCardPracticeZone'
import { cardStats, useProfile } from '../utils'

export const LowScoring = defineComponent({
    name: 'LowScoring',
    setup() {
        const profile = useProfile()
        const pool = ref([] as BM.FlashCard[])

        onMounted(() => {
            pool.value = allCards.filter((card) => {
                const stats = cardStats(card.bm, profile)
                // practice anything we have fewer than 4/5 recent correct answers on
                return stats.fiveRecent < 4
            })
        })

        return () => (
            <main class="low-score">
                {pool.value.length ? (
                    <FlashCardPracticeZone pool={pool.value} />
                ) : (
                    'No low-scoring cards!'
                )}
            </main>
        )
    },
})
