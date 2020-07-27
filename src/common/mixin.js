import {debounce} from "./utils"

export const itemListenerMixin = {
    data() {
        return{
            busLoad: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,100);
        this.busLoad = () => {
            refresh()
        }
        this.$bus.$on('itemImgOnload',this.busLoad);
        // console.log("俺是混入中的内容")
    }
}
export const backTop = {
    data() {
        return {
            isShow: false,
            scrollHeight: 0,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.BackScroll(0,0,500)
        },
    }
}