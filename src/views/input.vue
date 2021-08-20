<template>
  <tool-container 
  :title="'输入数据'">
      <el-tabs
        @tab-click="switchTab"
        v-model="activeName">
          <el-tab-pane 
          label="表格输入"
          name="table-input">
              <tool-table ref="tableInput"></tool-table>    
          </el-tab-pane>
          <el-tab-pane 
          label="文字输入"
          name="text-input">
              <tool-input ref="textInput"></tool-input> 
          </el-tab-pane>
      </el-tabs>
      <div class="button-container mt-15">
          <el-button
              type="primary" 
              @click="geneOAT()"
              :loading="loading"
              icon="el-icon-s-promotion">
          生成用例
          </el-button>
          <el-button
              @click="resetInput()"
              icon="el-icon-refresh-right">
              重置输入
          </el-button>
          <div class="split"></div>
          <el-button
              @click="importData(0)"
              icon="el-icon-document">
              导入示例数据一
          </el-button>
          <el-button
              @click="importData(1)"
              icon="el-icon-document">
              导入示例数据二
          </el-button>
      </div>
  </tool-container>
</template>

<script>
import ToolContainer from '../components/tool-container.vue'
import ToolTable from '../components/table-input.vue'
import ToolInput from '../components/text-input.vue'
import oat from "../utils/OAT"

export default {
  components: {
    ToolContainer,
    ToolTable,
    ToolInput,
  },
  data() {
    return {
      activeName: "table-input",
      loading: false
    };
  },
  methods: {
    switchTab(tab) {
      if (tab.name === "text-input") {
        this.$refs.textInput.getData();
      } else if (tab.name === "table-input") {
        this.$refs.tableInput.getData();
      }
    },
    geneOAT() {
      this.loading = true;
      
      this.$store.commit("reset", {
        type: "headers",
      });
      
      let values = JSON.parse(JSON.stringify(this.$store.state.values));
      
      values.forEach((arr) => {
        this.$store.commit("pushHeader", {
          v: arr.splice(0, 1)[0]
        })
      }); 
      
      oat(values, (values, matrix) => this.getRes(values, matrix), (err) => {
        this.loading = false;
        this.$message({
          type: 'error',
          message: err
        });  
      });
    },
    getRes(values, matrix) {
      this.$store.commit("reset", {
        type: "res",
      });
      
      let res = [];
      
      matrix.forEach(arr => {
        let t = arr.map((v, i) => {
          if (i >= values.length) return
          if (v >= values[i].length) {
            return values[i][v % values[i].length];    
          } else {
            return values[i][v];
          }
        }).filter(v => v != undefined);
        res.push(t);
      });
      
      // 去除重复的用例
      res = res.reduce((acc, v) => {
        if (!acc.some(x => JSON.stringify(x) == JSON.stringify(v))) acc.push(v);
        return acc;
      }, []);
      
      // 加入表头
      res.unshift(this.$store.state.headers);
      
      this.$store.commit("changeData", {
        type: "res",
        value: res
      });
      
      this.loading = false;
      this.$message({
        type: 'success',
        message: '获取成功!'
      });

      // console.log(JSON.stringify(values), JSON.stringify(matrix), JSON.stringify(res));
    },
    resetInput() {
      this.$confirm('此操作将重置您输入的数据, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit("reset", {
          type: "values",
        });
        this.$store.commit("reset", {
          type: "res",
        });
        
        this.syncData();
        
        this.$message({
          type: 'success',
          message: '重置成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        });          
      });
    },
    importData(index) {
      const demoData = [[
      ["性别", "男", "女"],
      ["班级", "1 班", "2 班"],
      ["成绩", "及格", "不及格"]],
      [
      ["对比度", "正常", "极低", "低", "高", "极高"],
      ["色彩效果", "无", "黑白", "棕褐色", "负片", "水绿色"],
      ["感光度", "自动", "100", "200", "400", "800"],
      ["白平衡", "自动", "白光", "日光", "荧光", "阴光"],
      ["照片大小", "5M", "3M", "2M", "1M", "VGA"], 
      ["闪光模式", "开", "关", "", "", ""]]
      ];
      
      this.$store.commit("changeData", {
        type: "values",
        value: demoData[index]
      });
      
      this.syncData();
      
      this.$message({
        type: "success",
        message: "导入成功！"
      })
      
    },
    syncData() {
      this.$refs.tableInput.getData();
      this.$refs.textInput.getData();
    }
  },
  computed: {
    hasRes() {
      return this.$store.state.res.length ? true : false;
    }
  }   
}
</script>