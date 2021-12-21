import { computed, defineComponent } from 'vue'
import { allCards, allTags } from '../content'
import { useRoute } from 'vue-router'
import { FlashCardPracticeZone } from '../components/flashCardPracticeZone'
import './tag.scss'

export const TagPage = defineComponent({
    name: 'TagPage',
    setup() {
        // Router
        // ====================
        const route = useRoute()

        // Tag pool
        // ====================
        const pool = computed(() => {
            const splitTags = (route.query.tag as string).split(',')
            return allCards.filter((card) =>
                card.tags?.find((tag) => splitTags.includes(tag))
            )
        })

        // Render function
        // ====================
        return () => (
            <main class="tags">
                <h2>Tags</h2>
                {/* nav */}
                <ul>
                    {allTags.map((tag) => {
                        const currentTag = route.query.tag
                        const tags = (currentTag as string).split(',')
                        const tagIsActive = tags.includes(tag)
                        if (tagIsActive) {
                            tags.splice(tags.indexOf(tag), 1)
                        } else {
                            tags.push(tag)
                        }

                        return (
                            <li class={tagIsActive ? 'active' : ''}>
                                <router-link
                                    to={{
                                        ...route,
                                        query: {
                                            ...route.query,
                                            tag: tags
                                                .filter((t) => t)
                                                .join(','),
                                        },
                                    }}
                                >
                                    {tag}
                                </router-link>
                            </li>
                        )
                    })}
                </ul>

                {/* practice with given tags */}
                {pool.value.length ? (
                    <FlashCardPracticeZone pool={pool.value} />
                ) : (
                    ''
                )}
            </main>
        )
    },
})
