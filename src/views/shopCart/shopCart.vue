<template>
  <div>
<!--		导航条-->
    <nav-bar class="nav-bar">
      <div slot="center">购物街({{length}})</div>
    </nav-bar>

<!--		商品列表-->
		<scroll class="content" ref="scroll">
				<shop-cart-list/>
		</scroll>

<!--		底部汇总-->
		<cart-bottom/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import shopCartList from "./childComps/shopCartList";
  import CartBottom from "./childComps/CartBottom";

  import { mapGetters } from "vuex"

  export default {
      name: "ShopCart",

			methods: {
          checkAll() {
              this.checked = this.$store.state.cartList.filter(item => item.isActive).length === this.$store.state.cartList.length
					}
			},
      components: {
          NavBar,
          Scroll,
          shopCartList,
          CartBottom
      },
      computed: {
          ...mapGetters({
							length: 'shopNumbers'
					})
      },
			activated() {
          this.$refs.scroll.scroll.refresh()
					// console.log(this.$store.state.cartList)
      }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
	.content {
		height: calc(100vh - 128px);
		overflow: hidden;
		margin-top: 44px;
	}
</style>
