<template>
    <div id="app">
        <Input />
        <transition name="el-fade-in-linear">
            <Output />
        </transition>
        <Readme />
    </div>
</template>

<script>
// import ToolCheckbox from './components/UI/tool-checkbox.vue'
import Input from './views/input.vue'
import Output from './views/output.vue'
import Readme from './views/readme.vue'

export default {
    components: {
        Input,
        Output,
        Readme
    },
}
</script>

<style lang="less">
    #app {
        margin: 0 auto;
        max-width: 80%;

        .title {
            text-align: center;
            font-weight: 700;
            text-shadow: 0.0625rem 0.0625rem 0.0625rem rgba(0,0,0,.15);
        }
        
        ul {
            padding-inline-start: 18px;
        }

        ul li {
            margin-top: 14px;
        }

        .button-container {
            display: flex;
            flex-wrap: wrap;

            .split {
                width: 100%;
                margin-right: 10px;
            }

             @media screen and (min-width: 825px) {
                .split {
                    width: 0;
                }
            }

            @media screen and (max-width: 825px) {
                .el-button {
                    margin-top: 10px;
                }
            }
        }
    }

    @media screen and (max-width: 444px) {
        .el-button:nth-last-child(1) {
            margin-left: 0 !important;
        }

        .el-message-box {
            width: 80% !important;

            button.el-button {
                margin-left: 10px !important;
            }
        }

        div.el-message {
            min-width: 310px !important;
        }
    }

    @media screen and (max-width: 335px) {
        .el-button {
            margin-left: 0 !important;
        }
    }

    @media screen and (max-width: 825px) {
        #app {
            max-width: 90%;
            font-size: 15px;
        }
    }
</style>