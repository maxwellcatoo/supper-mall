<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    .nav-bar {
        display: flex;
        height: 44px;
        line-height: 44px;
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        right: 0;
        box-shadow: 0 0 2px 1px #eee;
        background-color: var(--color-background);
    }

    .left, .right {
        width: 60px;
    }

    .center {
        flex: 1;
        text-align: center;
    }

</style>