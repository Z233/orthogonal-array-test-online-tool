<template>
    <div class="table-container"
    @scroll="handleScroll()">    
        <slot v-bind:isOffsetLeft="isOffsetLeft"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offsetLeft: 0
        };
    },
    methods: {
        handleScroll() {
            this.offsetLeft = this.$el.scrollLeft;

        }
    },
    computed: {
        isOffsetLeft() {
            return this.offsetLeft > 0 ?  true :  false;
        }
    },
}
</script>

<style lang="less">

    @border: solid 1px #ebeef5;

    @keyframes fade-in {
        0% { opacity: 0; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }

    .table-container {
        width: 100%;
        overflow-x: auto;
    }

    .shadow-right::after {
        box-shadow: #666666 9px 0 8px -10px inset;
        content: " ";
        height: 108%;
        position: absolute;
        top: -2px;
        right: -15px;
        width: 15px;
        z-index: 999;
        animation: fade-in 0.3s;
    }

    table {

        border-collapse: separate;
        border-spacing: 0;

        * {
            color: #606266;
            text-align: center;
            font-size: 13.3333px;
        }

        tr {
            // position: relative;
            box-sizing: border-box;

            &:last-child {
                td {
                    border-bottom: @border;
                }
            }

            td {
                box-sizing: border-box;
                min-width: 120px;
                height: 38px;
                line-height: 38px;


                border-left: @border;
                border-top: @border;

                div {
                    width: 120px;
                    white-space: nowrap;
                }

                .fixed {
                    position: absolute;
                    width: 120px;
                    background-color:#fff;
                    left: 0;
                    z-index: 10;
                    border-left: @border;
                }

                &:first-child {
                    border-right: @border;
                }

                &:last-child {
                    border-right: @border;
                }

                &:nth-child(2) {
                    border-left: none;
                }

                input {
                    border: none;
                    outline: none;
                    box-sizing: border-box;
                    background: transparent;
                    width: 100px;


                    &::placeholder {
                        color: #C0C4CC;
                    }

                    &:focus ~ .focus-bg {
                        transition: 0.5s; 
                        opacity: 1;
                    }
                }

                .focus-bg {
                    position: absolute; 
                    left: 0; 
                    top: 0; 
                    width: 100%; 
                    height: 100%; 
                    background-color: #ededed; 
                    opacity: 0; 
                    transition: 0.5s; 
                    z-index: -1;
                }

                .el-icon-plus {
                    cursor: pointer;
                }
                
                .remove {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 10px;
                    // visibility: hidden;
                }

            }
        }
    }

</style>