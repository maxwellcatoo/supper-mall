<template>
	<div class="tab-bottom">
		<div class="check-all">
			<check-button class="check" :class="{active:checkAll}" @click.native="clickAll"/>
			<span>全选</span>
		</div>
		<div class="total-price">
			<span>合计:￥{{totalPrice}}</span>
		</div>
		<div class="total-to" @click="checkIsNull">
			结算({{totalNums}})
		</div>
	</div>
</template>

<script>

    import CheckButton from "../../../components/content/checkButton/CheckButton";

    import {mapGetters} from "vuex";

    export default {
        name: "CartBottom",
				components: {
            CheckButton
				},
        data() {
            return {
                checked: true,
            }
        },
				methods: {
            clickAll() {
                // console.log("000")
                if(this.checkAll) {
										this.$store.state.cartList.forEach(item => {
                        item.isActive = false
                    })
								}else{
                    this.$store.state.cartList.forEach(item => {
                        item.isActive = true
										})
								}
						},
            checkIsNull() {
                if (this.totalNums === 0){
                    this.$toast.show('请选择要购买的商品',1500)
								}
						}
				},
        computed: {
            ...mapGetters({
                length: 'shopNumbers'
            }),
            totalPrice() {
                return this.$store.state.cartList.filter(item => {
                    return item.isActive
                }).reduce((preview,item) => {
                    return (preview + item.price * item.count)
                },0).toFixed(2)
            },
            totalNums() {
                return  this.$store.state.cartList.filter(item => item.isActive).length
            },
            checkAll() {
                if(this.$store.state.cartList.length !== 0){
                    return !this.$store.state.cartList.find(item => !item.isActive)
								}else{
                    return false
                }
						}
        },
    }
</script>

<style scoped>
	.tab-bottom {
		display: flex;
		height: 35px;
		background-color: #eee;
	}
	.check-all {
		line-height: 35px;
		display: flex;
		width: 80px;
	}
	.check {
		line-height: 18px;
		width: 20px;
		height: 20px;
		margin-top:8px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.total-price {
		flex: 1;
		line-height: 35px;
		margin-left: 20px;
	}
	.total-to {
		align-content: center;
		text-align: center;
		width: 80px;
		line-height: 35px;
		color: white;
		background-color: red;
	}
	/*.active {*/
	/*	border-color: var(--color-tint);*/
	/*	background-color: var(--color-tint);*/
	/*}*/
</style>