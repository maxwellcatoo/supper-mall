import {debounce} from "./utils"
import BackTop from "../components/content/backTop/BackTop";
import {POP, NEW, SELL} from "./const";

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
    components: {
        BackTop
    },
    data() {
        return {
            isShow: false,
            // scrollHeight: 0,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.BackScroll(0,0,500)
        },
        listenShowBackTop(position) {
            this.isShow = position.y < -1000
        }
    }
}

export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }