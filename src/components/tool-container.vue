<template>
  <div class="tool-container">
        <div v-if="title" class="tool-title">
            <span v-if="title">{{ title }}</span>
            <slot v-else name="title"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less">
    .tool-container {
        position: relative;
        padding: 32px;
        margin-top: 60px;
        margin-bottom: 50px;
        box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
            1px 3px 8px rgba(39, 44, 49, 0.03);
        background-color: #fff;
        border: none;
        border-radius: 8px;

        .tool-title {
            position: absolute;
            left: 30px;
            top: -18px;
            padding: 8px 15px;
            font-weight: bold;
            font-size: 0;
            background-color: var(--theme);
            color: #fff;
            box-shadow: 0 8px 10px rgba(36, 159, 253, 0.30196);
            border-radius: 8px;
        i {
            margin-right: 5px;
            font-size: 20px;
            vertical-align: middle;
        }
        span {
            font-size: 17px;
            line-height: 20px;
            vertical-align: middle;
        }
    }
    }
</style>>