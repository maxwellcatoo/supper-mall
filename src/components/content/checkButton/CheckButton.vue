<template>
	<div class="check-button" :class="{active:isActive}">
		<img src="../../../../src/assets/img/cart/tick.svg" alt="">
	</div>
</template>

<script>
    export default {
        name: "CheckButton",
				props: {
            isActive: {
                type: Boolean,
								default() {
                    return false
								}
						}
				},
				// methods: {
        //     btnClick() {
        //         this.$emit('checkBtnClick')
				// 		}
				// }
    }
</script>

<style scoped>
	.check-button {
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	.active {
		border-color: var(--color-tint);
		background-color: var(--color-tint);
	}
</style>