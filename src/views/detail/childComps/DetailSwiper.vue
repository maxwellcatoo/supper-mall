<template>
    <swiper class="detailSwiper">
        <swiper-item v-for="item in topImages">
            <img :src="item" alt="图片未正常显示">
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from '../../../components/common/swiper/index'

    export default {
        name: "DetailSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            topImages: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
  .detailSwiper {
      height: 400px;
      overflow: hidden;
      margin-top: 44px;
  }
</style>