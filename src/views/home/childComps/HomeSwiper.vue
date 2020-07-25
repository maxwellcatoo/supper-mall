<template>
    <swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image" alt="图片未正常显示" @load="imgOnload">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from '../../../components/common/swiper/index'

    export default {
        name: "HomeSwiper",
        data() {
            return {
                isLoad: false
            }
        },
        methods: {
            imgOnload() {
                if(!this.isLoad){
                    this.$emit('swiperImg')
                    this.isLoad = true
                }

            }
        },
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