declare namespace BM {
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
