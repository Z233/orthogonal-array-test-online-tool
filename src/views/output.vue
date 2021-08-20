<template>
  <tool-container
  :title="'测试用例'"
  v-show="hasRes">
      <table-output></table-output>
  </tool-container>
</template>

<script>
import ToolContainer from '../components/tool-container.vue'
import TableOutput from '../components/table-output.vue'

export default {
  components: {
    ToolContainer,
    TableOutput
  },
  computed: {
    hasRes() {
      return this.$store.state.res.length ? true : false;
    }
  }   
}
</script>