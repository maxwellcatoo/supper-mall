<template>
	<div>
		<cart-list-item v-for="item in $store.state.cartList" :itemInfo="item"/>
	</div>
</template>

<script>
	import CartListItem from "./CartListItem";

    export default {
        name: "shopCartList",
				components: {
            CartListItem
				},
				created() {
            // console.log(this.$store.state.cartList)
        }
    }
</script>

<style scoped>

</style>