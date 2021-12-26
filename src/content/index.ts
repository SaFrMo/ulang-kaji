import { LOCAL_CONFIG_KEY } from '../utils'
import { lesson001 } from './lesson001'
import { lesson002 } from './lesson002'
import { lesson003 } from './lesson003'
import { lesson004 } from './lesson004'
import { lesson005 } from './lesson005'
import { lesson006 } from './lesson006'
import { lesson007 } from './lesson007'

export const lessons: BM.Lesson[] = [
    lesson001,
    lesson002,
    lesson003,
    lesson004,
    lesson005,
    lesson006,
    lesson007,
]

export const allTags = [
    ...new Set(
        lessons.flatMap((lesson) =>
            lesson.cards.flatMap((card) => card.tags || [])
        )
    ),
]

export const allCards = lessons.flatMap((lesson) => lesson.cards)

export const flaggedCards = () =>
    allCards.filter((card) =>
        (
            JSON.parse(
                localStorage.getItem(LOCAL_CONFIG_KEY)!
            ) as BM.LocalStorageConfig
        ).flaggedCards.includes(card.bm)
    )
