import { computed, defineComponent, PropType, ref } from 'vue'
import { FlashCard } from './flashCard'
import './flashCardPracticeZone.scss'

export const FlashCardPracticeZone = defineComponent({
    name: 'FlashCardPracticeZone',
    props: {
        pool: { required: true, type: Array as PropType<BM.FlashCard[]> },
    },
    setup(props) {
        const currentIndex = ref(0)
        const card = computed(
            () => props.pool[currentIndex.value % props.pool.length]
        )

        return () => (
            <section class="flash-card-practice-zone">
                <h2>Practice</h2>

                <FlashCard
                    onNextCard={() => currentIndex.value++}
                    card={card.value}
                    key={card.value.eng}
                />
            </section>
        )
    },
})
