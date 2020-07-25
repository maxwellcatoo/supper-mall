<template>
    <div id="detail" name="detail">
        <detail-nav-bar></detail-nav-bar>
        <scroll :probeType=3 class="content" id="scroll">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo"
    import DetailShopInfo from "./childComps/DetailShopInfo"
    import Scroll from "../../components/common/scroll/Scroll"

    import {getDetail,Goods,Shop} from "../../network/detail"

    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll
        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {}
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
                const data = res.data.result
                // console.log(data)
                //2.获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //3.获取商家信息
                this.shop = new Shop(data.shopInfo)
                // console.log(this.shop.logo)
            })
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
        bottom: 0px;
        z-index: 11;
        background-color: var(--color-background);
    }
</style>