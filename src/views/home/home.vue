<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 :class="{aactive:swiperIsShow}"
                 ref="tabControl2" >
    </tab-control>
    <scroll class="content" ref="scroll"
            :probeType=3
            :pull-up-load="true"
            @scroll="scroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImg="swiperImg"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <future-view></future-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl" >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>


<script>

    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FutureView from "./childComps/FutureView";

    import NavBar from "../../components/common/navbar/NavBar"
    import TabControl from "../../components/content/tabContral/TabContral";
    import GoodsList from "../../components/content/goods/GoodsList";
    import GoodsListItem from "../../components/content/goods/GoodsListItem";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/content/backTop/BackTop";

    import {getHomeMultiData,getHomeGoods} from "../../network/home";
    import {debounce} from "../../common/utils";
    import {itemListenerMixin,backTop} from "../../common/mixin"

    export default {
        name: "Home",
        components: {
          HomeSwiper,
          RecommendView,
          FutureView,

          NavBar,
          TabControl,
          GoodsList,
          GoodsListItem,
          Scroll,
          BackTop
        },
      mixins: [itemListenerMixin,backTop],
      data(){
        return {
          banners: [],
          recommends: [],
          goods: {
            pop: {page: 0,list: []},
            new: {page: 0,list: []},
            sell: {page: 0,list: []}
          },
          currentType: 'pop',
          // isShow: false,
          scrollHeight: 0,
          swiperIsShow: false,
          saveY: 0,
        }
      },
      computed: {
          showGoods() {
            return this.goods[this.currentType].list
          }
      },
      created() {
        //请求多个数据
        this.getHomeMultiData()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      mounted() {
      },
      //记录跳转到其他页面时本页面的滑动条位置
      activated() {
          this.$refs.scroll.refresh();
          this.$refs.scroll.scroll.scrollTo(0,this.saveY);
      },
      deactivated() {
          this.saveY = this.$refs.scroll.scroll.y;

          this.$bus.$off('itemImgOnload',this.busLoad);
      },
      methods: {
        /**
         *事件监听相关方法
         **/
        tabClick(index) {
          switch (index) {
            case 0: this.currentType = 'pop';break;
            case 1: this.currentType = 'new';break;
            case 2: this.currentType = 'sell';break;
          }
          this.$refs.tabControl2.currentIndex = index
          this.$refs.tabControl.currentIndex = index
        },
        // backClick() {
        //   this.$refs.scroll.BackScroll(0,0,500)
        // },
        scroll(position) {
          //1.监听滚动条位置，是否显示上拉图标
          // this.isShow = position.y < -1000
          this.listenShowBackTop(position)
          //2.监听滚动条位置，对swiper实现吸顶效果
          this.swiperIsShow = -position.y>this.scrollHeight
          // console.log(this.swiperIsShow)
        },
        loadMore() {
          // console.log('xia')
          this.getHomeGoods(this.currentType)
          this.$refs.scroll.scroll.finishPullUp()
        },
        swiperImg() {
          this.scrollHeight = this.$refs.tabControl.$el.offsetTop
        },
        /**
        *网络请求相关方法
        **/
        getHomeMultiData(){
          getHomeMultiData().then(res=>{
            // console.log(res)
            this.banners = res.data.data.banner.list
            this.recommends = res.data.data.recommend.list
          })
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res => {
            // console.log(res)
            this.goods[type].list.push(...res.data.data.list)
            this.goods[type].page += 1
          })
        },

      }
    }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  #home {
    height: 100vh;
  }
  .content {
    height: calc(100% - 93px);
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  /*.content {*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
  .aactive {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .tab-control1 {
    position: fixed;
    z-index: 9;
    top: 44px;
    right: 0;
    left: 0;
  }
</style>
