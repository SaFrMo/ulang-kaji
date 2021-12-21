import { computed, defineComponent, PropType, ref } from 'vue'
import './flashCard.scss'

export const FlashCard = defineComponent({
    name: 'FlashCard',
    props: {
        card: { required: true, type: Object as PropType<BM.FlashCard> },
        show: { type: String as PropType<BM.CardSide> },
    },
    emits: ['nextCard'],
    setup(props, context) {
        const showing = ref<BM.CardSide>(props.show ?? 'eng')

        return () => (
            <div class="flash-card">
                <div class="content">{props.card[showing.value]}</div>

                <div class="button-wrap">
                    {/* Flip */}
                    <button
                        onClick={() =>
                            (showing.value =
                                showing.value === 'eng' ? 'bm' : 'eng')
                        }
                    >
                        Flip
                    </button>
                    {/* Next card */}
                    <button onClick={() => context.emit('nextCard')}>
                        Next card
                    </button>
                </div>
            </div>
        )
    },
})
