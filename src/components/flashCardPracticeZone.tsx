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

        const toShow = ref<BM.CardSide>('eng')

        return () => (
            <section class="flash-card-practice-zone">
                <h2>Practice</h2>

                <button
                    onClick={() =>
                        (toShow.value = toShow.value === 'eng' ? 'bm' : 'eng')
                    }
                >
                    Toggle BM/Eng
                </button>

                <FlashCard
                    onNextCard={() =>
                        (currentIndex.value = Math.floor(
                            Math.random() * props.pool.length
                        ))
                    }
                    card={card.value}
                    key={card.value.eng + toShow.value}
                    show={toShow.value}
                />
            </section>
        )
    },
})
