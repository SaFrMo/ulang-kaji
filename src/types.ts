declare namespace BM {
    type CardSide = 'bm' | 'en'

    interface CardStat {
        ms: string
        correct: boolean
        time: number
    }

    interface FlashCard {
        bm: string
        helper?: string
        en: string
        tags?: string[]
    }

    interface Lesson {
        cards: FlashCard[]
        id: number
        name: string
        pdfUrl?: string
    }

    interface LocalStorageConfig {
        cardStats: CardStat[]
        flaggedCards: string[]
    }
}
