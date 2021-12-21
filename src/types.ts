declare namespace BM {
    type CardSide = 'bm' | 'eng'

    interface FlashCard {
        bm: string
        eng: string
    }

    interface Lesson {
        id: number
        name: string
        cards: FlashCard[]
    }
}
