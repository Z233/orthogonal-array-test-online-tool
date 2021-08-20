<template>
    <div>
        <table-container class="table-output">
            <template v-slot="{isOffsetLeft}">
                <table>
                    <tr v-for="(arr, idx) in res" :key="idx">
                        <td v-if="idx == 0">
                            <small class="fixed" :class="{'shadow-right': isOffsetLeft}">用例</small>
                            <div>用例</div>
                        </td>
                        <td v-else>
                            <small class="fixed" :class="{'shadow-right': isOffsetLeft}">{{`用例 ${idx}`}}</small>
                            <div>{{`用例 ${idx}`}}</div>
                        </td>
                        <td v-for="(v, i) in arr" :key="i"><div>{{v}}</div></td>
                    </tr>
                </table>
            </template>
        </table-container>
        <el-button
            class="mt-15"
            type="primary"
            icon="el-icon-copy-document"
            @click="copyToClipboard()">
            复制到剪贴板
        </el-button>
        <el-button
            class="mt-15"
            icon="el-icon-download"
            @click="downCsv()">
            下载 CSV 文件
        </el-button>
    </div>
</template>

<script>
import tableContainer from './table-container.vue';

export default {
    components: { tableContainer },
    data() {
        return {
        }
    },
    computed: {
        res() {
            return this.$store.state.res;
        }, 
    },
    methods: {
        parseData(delimiter) {
            return this.$csv.stringify(JSON.parse(JSON.stringify(this.res)).map((arr, idx) => {
                idx == 0 ? arr.unshift("") : arr.unshift(`用例 ${idx}`);
                return arr;
            }), delimiter);
        },
        downCsv() {
            const anchor = document.createElement('a');
            anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent("\ufeff" + this.parseData(","));
            anchor.target = '_blank';
            anchor.download = '测试用例.csv';
            anchor.click();
        },
        copyToClipboard() {
            const textArea = document.createElement("textarea");

            // 隐藏输入区域
            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = '1px';
            textArea.style.height = '1px';
            textArea.style.padding = 0;
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            textArea.style.resize = 'none';

            textArea.value = this.parseData("\t");

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.activeElement.blur();
                const msg = document.execCommand('copy') ? {
                    type: "success",
                    message: "复制成功！",
                } : {
                    type: "error",
                    message: "复制失败"
                }

                this.$message(msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        }
    },        

}
</script>

<style lang="less">
    .table-output {
        .fixed {
            left: 32px;
        }
    }
</style>