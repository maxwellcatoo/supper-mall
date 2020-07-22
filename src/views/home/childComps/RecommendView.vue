<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecommendView",
        props: {
            recommends: {
                type: Array,
                default() {
                    return []
                }
            },
        }
    }

</script>

<style scoped>
  .recommend {
      display: flex;
      width: 100%;
      text-align: center;
      font-size: 12px;
      padding: 10px 0 20px;
      box-shadow: 0 5px 5px #eee;
  }
    .recommend-item  {
        flex: 1;
    }
  .recommend-item>a>img {
      width: 80%;
      height: 80%;
      margin-bottom: 6px;
      /*width: 62px;*/
      /*height: 62px;*/
  }
</style>