import { defineComponent, PropType, ref, watch } from 'vue'
import './flashCard.scss'
import { StarSvg } from './svg/star'
import { LOCAL_CONFIG_KEY } from '../utils'

export const FlashCard = defineComponent({
    name: 'FlashCard',
    props: {
        card: { required: true, type: Object as PropType<BM.FlashCard> },
        show: { type: String as PropType<BM.CardSide> },
    },
    emits: ['nextCard'],
    setup(props, context) {
        const showing = ref<BM.CardSide>(props.show ?? 'en')
        const cardId = props.card.bm

        // Flagging
        // ====================
        const localConfig = JSON.parse(
            localStorage.getItem(LOCAL_CONFIG_KEY)!
        ) as BM.LocalStorageConfig

        const flagged = ref((localConfig.flaggedCards ?? []).includes(cardId))
        watch(
            () => flagged.value,
            () => {
                const curr = JSON.parse(
                    localStorage.getItem(LOCAL_CONFIG_KEY)!
                ) as BM.LocalStorageConfig
                if (curr.flaggedCards.includes(cardId)) {
                    curr.flaggedCards.splice(
                        curr.flaggedCards.indexOf(cardId),
                        1
                    )
                } else {
                    curr.flaggedCards.push(cardId)
                }
                localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(curr))
            }
        )

        // Render function
        // ====================
        return () => (
            <div class="flash-card">
                <div class="content">{props.card[showing.value]}</div>

                {/* Star */}
                <div class="mark-wrap">
                    <button
                        aria-label={`${
                            flagged.value ? 'Unmark' : 'Mark'
                        } this card.`}
                        class={flagged.value ? 'marked' : 'unmarked'}
                        onClick={() => (flagged.value = !flagged.value)}
                    >
                        <StarSvg />
                    </button>
                </div>

                <div class="button-wrap">
                    {/* Flip */}
                    <button
                        onClick={() =>
                            (showing.value =
                                showing.value === 'en' ? 'bm' : 'en')
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
