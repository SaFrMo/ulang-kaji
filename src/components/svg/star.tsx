import { defineComponent } from 'vue'

export const StarSvg = defineComponent({
    name: 'StarSvg',
    setup() {
        return () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                <path
                    fill="#ffbd00"
                    d="M7.5 0.25 L9.375 6 h5.625 L10.375 9.25 L12.25 14.875 L7.5 11.375 L2.75 14.875 L4.625 9.25 L0 6 h5.625 Z"
                />
            </svg>
        )
    },
})
