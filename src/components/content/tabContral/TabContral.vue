<template>
    <div class="tab-control">
        <div class="tab-control-item" v-for="(item,index) in titles" :key='index'
        :class="{active:index === currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        data() {
            return {
                currentIndex: 0
            }
        },
        props:  {
            titles:{
                type:Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
    .tab-control {
        background-color: var(--color-background);
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
    }

    .tab-control-item {
        flex: 1;
    }

    .active {
        color: var(--color-tint);
    }

    .active>span {
        border-bottom: 1px solid var(--color-tint);
        padding: 5px;
        margin-top: 3px;
    }
</style>