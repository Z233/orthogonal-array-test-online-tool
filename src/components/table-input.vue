<template>
    <table-container class="table-input">
        <template v-slot="{isOffsetLeft}">
            <table>
                <tr>
                    <td :key="'column0'">
                        <small class="fixed" :class="{'shadow-right': isOffsetLeft}">因素</small>
                        <div>因素</div>
                    </td>
                    <td v-for="n3 in getColumn - 1" :key="`column1-${n3}`" style="position: relative">
                        <el-tooltip 
                            effect="dark" 
                            offset="12"
                            content="删除该列" 
                            placement="top-start">                            
                            <span class="remove el-icon-close" @click="removeCloumn(n3)"></span>     
                        </el-tooltip>
                        {{"水平" + " " + n3}}
                    </td>
                    <td @click="addColumn()" :key="'columnLlast'">
                        <span class="el-icon-plus"></span>
                    </td>
                </tr>
                <tr v-for="n1 in getRow" :key="`row-${n1}`">
                    <td v-for="(n2) in getColumn" :key="`column2-${n2}`">
                        <small class="fixed" v-if="n2 == 1"
                        :class="{'shadow-right': isOffsetLeft}">
                            <el-tooltip 
                                effect="dark"
                                offset="12" 
                                content="删除该行" 
                                placement="top-start">
                                <span class="remove el-icon-close"
                                @click="removeRow(n1)">
                                </span>
                            </el-tooltip>
                            <input type="text" 
                            v-model="values[n1 - 1][n2 - 1]"
                            :placeholder="values[n1 - 1][n2 - 1] == '' ? '（值）' : ''">
                            <span class="focus-bg"></span>
                        </small>
                        <div style="position: relative;">
                            <input type="text" 
                            v-model="values[n1 - 1][n2 - 1]"
                            :placeholder="values[n1 - 1][n2 - 1] == '' ? '（值）' : ''">
                            <span class="focus-bg"></span>
                        </div>
                    </td>
                    <td @click="addColumn()">
                        <span class="el-icon-plus"></span>
                    </td>
                </tr>
                <tr>
                    <td v-for="n4 in getColumn + 1" :key="`column3-${n4}`"
                    @click="n4 < (getColumn + 1) ? addRow() : addColumnAndRow()"
                    :class="{'shadow-right': isOffsetLeft && n4 == 1}">
                        <small class="fixed" v-if="n4 == 1" :class="{'shadow-right': isOffsetLeft}"><span class="el-icon-plus"></span></small>
                        <div><span class="el-icon-plus"></span></div>
                    </td>
                </tr>
            </table>
        </template>
    </table-container>
</template>

<script>
import tableContainer from './table-container.vue';
export default {
    components: { tableContainer },
    data() {
        return {
            emptyMsg: "",
            values: this.$store.state.values,
        };
    },
    methods: {
        addColumn() {
            this.$store.commit("addColumn");
            this.values = this.$store.state.values;
        },
        addRow() {
            this.$store.commit("addRow");
            this.values = this.$store.state.values;
        },
        addColumnAndRow() {
            this.addColumn();
            this.addRow();
        },
        getData() {
            this.values = this.$store.state.values;
            this.$store.commit("addHead");
        },
        geneID() {
            return this.$shortid.generate();
        },
        removeCloumn(index) {
            this.$store.commit("removeColumn", {
                index: index
            });
            this.values = this.$store.state.values;
        },
        removeRow(index) {
            this.$store.commit("removeRow", {
                index: index
            });
            this.values = this.$store.state.values;
        }
    },
    computed: {
        getRow() {
            return this.values.length
        },
        getColumn() {
            return this.values[0].length;
        },
    },
    watch: {
        values() {
            this.$store.commit("changeData", {
                type: "values",
                value: this.values
            });
        },
    },
}
</script>

<style>
</style>