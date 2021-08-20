<template>
  <div class="tool-checkbox">
      <el-checkbox :id="id">{{ label }}</el-checkbox>
  </div>
</template>

<script>
export default {
    props:["label"],
    data() {
        return {
            id: null
        };
    },
    mounted() {
        this.id = this.$shortid.generate();
    }
}
</script>

<style lang="less">
    .tool-checkbox {
        display: inline-flex;
        align-items: center;

        input[type='checkbox'] {
        
        &:checked {
            & + label {
                i {
                    opacity: 1;
                }
            }
        }
    }
    }
</style>