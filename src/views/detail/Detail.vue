<template>
    <div id="detail" name="detail">
        <detail-nav-bar @navBarClick="navBarClick" ref="navBar"></detail-nav-bar>
        <scroll :probeType=3 class="content" id="scroll" ref="scroll" @scroll="navChange">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="goodsInfoOnload">
            </detail-goods-info>
            <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo" ref="comment">
            </detail-comment-info>
            <goods-list :goods="recommend" ref="goods"/>
        </scroll>
        <back-top class="back-top" @click.native="backClick" v-show="isShow"></back-top>
        <detail-bottom-bar class="bottom"/>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo"
    import DetailShopInfo from "./childComps/DetailShopInfo"
    import Scroll from "../../components/common/scroll/Scroll"
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo"
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "../../components/content/backTop/BackTop";

    import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "../../network/detail"
    import {debounce} from "../../common/utils";
    import {itemListenerMixin,backTop} from "../../common/mixin"

    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            BackTop
        },
        mixins: [itemListenerMixin,backTop],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommend: [],
                detailNavBar: [],
                currentIndex: 0
            }
        },
        methods: {
            goodsInfoOnload() {
                // 当有图片传进来时，使用防抖和refresh对scroll计算的滚动高度进行更新
                // const refresh = debounce(this.$refs.scroll.refresh,500);
                // refresh()
                // console.log("000")
                this.$refs.scroll.refresh()

                this.detailNavBar = []
                this.detailNavBar.push(0)
                this.detailNavBar.push(this.$refs.param.$el.offsetTop)
                this.detailNavBar.push(this.$refs.comment.$el.offsetTop)
                this.detailNavBar.push(this.$refs.goods.$el.offsetTop)
                // console.log(this.detailNavBar)
            },
            navBarClick(index) {
                this.$refs.scroll.scroll.scrollTo(0,-this.detailNavBar[index]-44,200)
                // console.log(index)
            },
            navChange() {
                let scrollY = -this.$refs.scroll.scroll.y-44;
                let length = this.detailNavBar.length
                // console.log(scrollY)
                for(let i in this.detailNavBar) {
                    i = i-0
                    if(i !== this.currentIndex){
                        if(i !== length-1 && scrollY>this.detailNavBar[i] && scrollY<this.detailNavBar[i+1] || i === length-1 && scrollY>this.detailNavBar[i]){
                            this.currentIndex = i
                            this.$refs.navBar.currentIndex = this.currentIndex
                            // console.log(this.currentIndex)
                        }
                    }
                }
            },
            backClick() {
                this.$refs.scroll.BackScroll(0,0,500)
            },
            scroll(position) {
                //1.监听滚动条位置，是否显示上拉图标
                this.isShow = position.y < -1000
            }
        },
        created() {
            //保存传入的iid
            this.iid = this.$route.params.iid;
            //根据iid获得对应的详情数据
            getDetail(this.iid).then(res => {
                //1.获取顶部的轮播图信息
                this.topImages = res.data.result.itemInfo.topImages
                // console.log(res.data)
                // console.log(data)
                //2.获取商品信息
                const data = res.data.result
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //3.获取商家信息
                this.shop = new Shop(data.shopInfo)
                // console.log(this.shop.logo)
                //4.获取更多信息
                this.detailInfo = data.detailInfo
                //5.获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
                // console.log(data)
                if(data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                    // console.log(this.commentInfo)
                }
            })
            //获取推荐信息
            getRecommend().then(res => {
                this.recommend = res.data.data.list
                // console.log(this.recommend)
            })
        },
        mounted() {
        },
        destroyed() {
            this.$bus.$off('itemImgOnload',this.busLoad)
        }
    }
</script>

<style scoped>
    .content {
        /*这个元素的父元素没有定义高度，所以这里时不能使用100\%这个方式来表示的
        用的是position定位中的top和bottom赋值来给元素以高度*/
        /*height: calc(100% - 44px);*/
        overflow: hidden;

        position: fixed;
        top: 44px;
        bottom: 58px;
        z-index: 11;
        background-color: var(--color-background);
    }
    .bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 11;
    }
    .back-top {
        position: fixed;
        bottom: 65px;
        right: 10px;
        z-index: 15;
    }
</style>