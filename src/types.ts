declare namespace BM {
    type CardSide = 'bm' | 'en'

    interface FlashCard {
        bm: string
        en: string
        tags?: string[]
    }

    interface Lesson {
        cards: FlashCard[]
        id: number
        name: string
        pdfUrl?: string
    }
}
