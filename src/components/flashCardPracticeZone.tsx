import { computed, defineComponent, PropType, ref } from 'vue'
import { FlashCard } from './flashCard'
import './flashCardPracticeZone.scss'

export const FlashCardPracticeZone = defineComponent({
    name: 'FlashCardPracticeZone',
    props: {
        pool: { required: true, type: Array as PropType<BM.FlashCard[]> },
    },
    setup(props) {
        const currentIndex = ref(Math.floor(Math.random() * props.pool.length))
        const card = computed(
            () => props.pool[currentIndex.value % props.pool.length]
        )

        const toShow = ref<BM.CardSide>('en')

        const displayedIndexes = ref<number[]>([currentIndex.value])

        // Render function
        // ====================
        return () => (
            <section class="flash-card-practice-zone">
                <h2>Ulang kaji</h2>

                <FlashCard
                    onNextCard={() => {
                        let next: number
                        do {
                            next = Math.floor(Math.random() * props.pool.length)
                        } while (
                            currentIndex.value === next ||
                            displayedIndexes.value.includes(next)
                        )

                        displayedIndexes.value.push(next)
                        // clear if all complete
                        if (
                            displayedIndexes.value.length >= props.pool.length
                        ) {
                            displayedIndexes.value = []
                        }
                        currentIndex.value = next
                    }}
                    card={card.value}
                    key={card.value.en + toShow.value}
                    show={toShow.value}
                />

                <div class="option-wrap">
                    <button
                        onClick={() =>
                            (toShow.value = toShow.value === 'en' ? 'bm' : 'en')
                        }
                    >
                        BM/Eng
                    </button>
                </div>
            </section>
        )
    },
})
