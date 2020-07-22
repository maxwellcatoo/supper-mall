<template>
    <swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image" alt="图片未正常显示">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
    import {getHomeMultidate} from "../../../network/home";

    export default {
        name: "HomeSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
    }
</script>

<style scoped>

</style>