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
                stats.completedCorrect.sort((a, b) => b.time - a.time)
                // practice anything we got less than 2 right answers on, total or recently
                return (
                    stats.completedCorrect.length < 2 ||
                    stats.completedCorrect.slice(0, 2).find((v) => !v.correct)
                )
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
