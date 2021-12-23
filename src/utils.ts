import { inject } from 'vue'
import { allCards } from './content'
import { sortBy } from 'lodash'

export const LOCAL_CONFIG_KEY = 'bm-practice'

export const cardStats = (bm: string, profile: BM.LocalStorageConfig) => {
    const card = allCards.find((card) => card.bm === bm)
    const output = {
        totalCompleted: [] as BM.CardStat[],
        completedCorrect: [] as BM.CardStat[],
        fiveRecent: 0,
    }

    if (card) {
        output.totalCompleted = profile.cardStats.filter(
            (stat) => stat.ms === card.bm
        )
        output.completedCorrect = output.totalCompleted.filter(
            (stat) => stat.correct
        )
        output.fiveRecent = sortBy(output.totalCompleted, 'time')
            .reverse()
            .splice(0, 5)
            .reduce((acc, curr) => {
                if (curr.correct) acc++
                return acc
            }, 0)
    }

    return output
}

export const saveProfile = (profile?: BM.LocalStorageConfig) => {
    localStorage.setItem(
        LOCAL_CONFIG_KEY,
        JSON.stringify(profile ?? useProfile())
    )
}

export const useProfile = () => {
    return inject('profile') as BM.LocalStorageConfig
}
