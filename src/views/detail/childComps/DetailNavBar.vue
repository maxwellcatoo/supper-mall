<template>
    <div id="detail">
        <nav-bar>
            <div slot="left" @click="detailBack" class="back">
                <img src="../../../assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles"
                     :class="{active: currentIndex === index}"
                     @click="detailClick(index)"
                     class="title-item">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";

    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ['商品','参数','评论','推荐'],
                currentIndex: 0
            }
        },
        methods: {
            detailClick(index) {
                this.currentIndex = index
            },
            detailBack() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title {
        display: flex;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-tint)
    }
    .back {
        text-align: center;
        margin-top: 6px;
    }
</style>