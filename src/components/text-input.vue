<template>
  <div>
        <div>
            <el-checkbox 
                class="mb-15"
                v-model="textHasHead">
                    包含因素名
            </el-checkbox>
            <div class="delimiter-input" style="display: inline; margin-left: 15px; font-size: 14px;">
                <label for="delimiter" style="">分隔符</label>
                <el-input
                    style="width: 40px; margin-left: 10px;"
                    name="delimiter"
                    size="mini"
                    v-model="delimiter"
                    maxlength="1">
                </el-input>
            </div>
        </div>
        <div>
            <el-input
                type="textarea"
                :rows="5"
                v-model="text">
            </el-input>
        </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            textHasHead: this.$store.state.textHasHead,
            hasHead: this.$store.state.hasHead,
            text: "",
            values: this.$store.state.values,
            delimiter: this.$store.state.delimiter,
        }
    },
    methods: {
        arr2Str() {
            return this.$csv.stringify(this.values, this.$store.state.delimiter);
        },
        str2Arr() {
            let arr = this.$csv.parse(this.text, this.$store.state.delimiter);
            return arr;
        },
        getData() {
            this.values = this.$store.state.values;
            if (this.$store.state.tableHasHead && !this.$store.state.textHasHead) {
                this.$store.commit("removeHead");
            }
            this.text = this.arr2Str();
        },
    },
    watch: {
        textHasHead() {
            this.$store.commit("changeData", {
                type: "textHasHead",
                value: this.textHasHead
            });
            this.$store.commit("changeData", {
                type: "tableHasHead",
                value: !this.$store.state.tableHasHead
            });
        },
        text() {
            const newDelimiter = this.$csv.detect(this.text);
            const arr = this.$csv.parse(this.text, newDelimiter);

            this.$store.commit("changeData", {
                type: "delimiter",
                value: newDelimiter
            });
            this.$store.commit("changeData", {
                type: "values",
                value: arr
            });
            this.delimiter = newDelimiter == "\t" ? `t` : newDelimiter;
        },
        delimiter() {
            const acDelimiters = ["\t", "|", ";", ","];
            this.delimiter = this.delimiter.replace("t", "\t");
            if (acDelimiters.includes(this.delimiter)) {
                this.$store.commit("changeData", {
                    type: "delimiter",
                    value: this.delimiter
                });
                this.getData();
            } else if (this.delimiter != ""){
                this.$message({
                    type: 'error',
                    message: `"${this.delimiter}" 不能作为分隔符`
                });
            }
        }
    },
    computed: {
    },
    created: function() {
        this.getData();
    }
}
</script>

<style>

</style>