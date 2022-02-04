import { LOCAL_CONFIG_KEY } from '../utils'
import { lesson001 } from './lesson001'
import { lesson002 } from './lesson002'
import { lesson003 } from './lesson003'
import { lesson004 } from './lesson004'
import { lesson005 } from './lesson005'
import { lesson006 } from './lesson006'
import { lesson007 } from './lesson007'
import { lesson008 } from './lesson008'
import { lesson009 } from './lesson009'
import { lesson010 } from './lesson010'
import { lesson011 } from './lesson011'
import { lesson012 } from './lesson012'
import { lesson013 } from './lesson013'

export const lessons: BM.Lesson[] = [
    lesson001,
    lesson002,
    lesson003,
    lesson004,
    lesson005,
    lesson006,
    lesson007,
    lesson008,
    lesson009,
    lesson010,
    lesson011,
    lesson012,
    lesson013,
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
