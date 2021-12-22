import { inject } from 'vue'

export const LOCAL_CONFIG_KEY = 'bm-practice'

export const saveProfile = (profile?: BM.LocalStorageConfig) => {
    localStorage.setItem(
        LOCAL_CONFIG_KEY,
        JSON.stringify(profile ?? useProfile())
    )
}

export const useProfile = () => {
    return inject('profile') as BM.LocalStorageConfig
}
