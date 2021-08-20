import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        textHasHead: true,
        tableHasHead: true,
        hasHead: true,
        delimiter: ",",
        res: [],
        headers: [],
        // 色彩效果：无、黑白、棕褐色、负片、水绿色
        // values: [
        //         ["对比度", "正常", "极低", "低", "高", "极高"],
        //         ["色彩效果", "无", "黑白", "棕褐色", "负片", "水绿色"],
        //         ["感光度", "自动", "100", "200", "400", "800"],
        //         ["白平衡", "自动", "白光", "日光", "荧光", "阴光"],
        //         ["照片大小", "5M", "3M", "2M", "1M", "VGA"], 
        //         ["闪光模式", "开", "关"]],
        // values: [
        //         ["性别", "男", "女"],
        //         ["班级", "1 班", "2 班"],
        //         ["成绩", "及格", "不及格"] 
        // ],
        values: [["", ""]],
    },
    mutations: {
        changeData(state, payload) {
            state[payload.type] = payload.value;
        },
        addColumn(state) {
            state.values.forEach(arr => {
                arr.push("");
            });
        },
        addRow(state) {
            const newRow = state.values[0].concat().map(() => { return "" });
            state.values.push(newRow);
        },
        addHead(state) {
            if (state.tableHasHead) return;
            state.values.forEach((arr) => {
                arr.unshift("");
            });
            state.tableHasHead = true;
        },
        removeColumn(state, payload) {
            state.values = state.values.map(arr => {
                arr.splice(payload.index, 1);
                return arr;
            });
        },
        removeRow(state, payload) {
            if (state.values.length === 1) {
                state.values.splice(0, 1, state.values[0].map(v => ""));
            }
            else state.values.splice(payload.index - 1, 1);
        },
        removeHead(state) {
            state.values.forEach((arr) => {
                arr.splice(0, 1);
            });
            state.tableHasHead = false;
        },
        pushHeader(state, payload) {
            state.headers.push(payload.v);
        },
        reset(state, payload) {
            if (payload.type == "values") state[payload.type] = [["", ""]];
            else state[payload.type] = [];
        },
    },
    actions: {
    },
    getters: {
    },
    modules: {
    }
})
