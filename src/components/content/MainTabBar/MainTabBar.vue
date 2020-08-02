<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img src="../../../assets/img/tabbar/home1.png" slot="item-icon">
      <img src="../../../assets/img/tabbar/home2.png" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <img src="../../../assets/img/tabbar/menu1.png" slot="item-icon">
      <img src="../../../assets/img/tabbar/menu2.png" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shop-cart" activeColor="blue">
      <img src="../../../assets/img/tabbar/buycar1.png" slot="item-icon">
      <img src="../../../assets/img/tabbar/buycar2.png" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <img src="../../../assets/img/tabbar/mine1.png" slot="item-icon">
      <img src="../../../assets/img/tabbar/mine2.png" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from '../../common/tabbar/TabBar-item'
    export default {
      name: "MainTabBar",
      components: {
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
