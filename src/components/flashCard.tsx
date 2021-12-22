import {
    defineComponent,
    onBeforeUnmount,
    onMounted,
    PropType,
    ref,
    watch,
} from 'vue'
import './flashCard.scss'
import { StarSvg } from './svg/star'
import { LOCAL_CONFIG_KEY, saveProfile, useProfile } from '../utils'
import { sortBy } from 'lodash'

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
        const profile = useProfile()

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

        // Mark correct/incorrect
        // ====================
        const gotCorrectAnswer = (correct: boolean) => {
            profile.cardStats.push({
                correct,
                ms: props.card.bm,
                time: Date.now(),
            })
            saveProfile(profile)
        }

        // Practice flow
        // ====================
        let flowFlipped = false
        const handleKeydown = (evt: KeyboardEvent) => {
            // space: flip
            if (evt.key === ' ') {
                if (!flowFlipped) {
                    flowFlipped = true
                    showing.value = showing.value === 'en' ? 'bm' : 'en'
                }
            }
            // 1: correct
            else if (evt.key === '1') {
                gotCorrectAnswer(true)
                context.emit('nextCard')
            } else if (evt.key === '2') {
                // 2: incorrect
                gotCorrectAnswer(false)
                context.emit('nextCard')
            }
        }
        onMounted(() => {
            window.addEventListener('keydown', handleKeydown)
        })
        onBeforeUnmount(() => {
            window.removeEventListener('keydown', handleKeydown)
        })

        // Stats
        // ====================
        const totalCompleted = profile.cardStats.filter(
            (stat) => stat.ms === props.card.bm
        )
        const completedCorrect = totalCompleted.filter((stat) => stat.correct)
        const fiveRecent = sortBy(totalCompleted, 'time')
            .reverse()
            .splice(0, 5)
            .reduce((acc, curr) => {
                if (curr.correct) acc++
                return acc
            }, 0)

        // Render function
        // ====================
        return () => (
            <div class="flash-card">
                <div class="content">
                    <p>{props.card[showing.value]}</p>
                    {props.card.helper && <em>hint: {props.card.helper}</em>}
                </div>

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

                    {/* Stats */}
                    <p>
                        <span>
                            {completedCorrect.length} / {totalCompleted.length}
                        </span>
                        <br />
                        <span>
                            Five latest: {fiveRecent} /{' '}
                            {Math.min(totalCompleted.length, 5)}
                        </span>
                    </p>

                    {/* Practice flow */}
                    <p>
                        <strong>Practice flow:</strong>
                        <br />
                        <em>[space]: flip</em>
                        <br />
                        <em>
                            [1]: correct
                            <br />
                            [2]: incorrect
                        </em>
                    </p>
                </div>
            </div>
        )
    },
})
