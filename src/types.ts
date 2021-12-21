declare namespace BM {
    interface FlashCard {
        front: string
        back: string
    }

    interface Lesson {
        id: number
        name: string
        cards: FlashCard[]
    }
}
