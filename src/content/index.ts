import { lesson001 } from './lesson001'
import { lesson002 } from './lesson002'
import { lesson003 } from './lesson003'

export const lessons: BM.Lesson[] = [lesson001, lesson002, lesson003]

export const allTags = [
    ...new Set(
        lessons.flatMap((lesson) =>
            lesson.cards.flatMap((card) => card.tags || [])
        )
    ),
]

export const allCards = lessons.flatMap((lesson) => lesson.cards)
