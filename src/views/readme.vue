<template>
  <tool-container :title="'说明'">
    <ul>
      <li>如果是第一次使用生成速度会慢一些，因为要加载资源文件。</li>
      <li>本工具支持单一水平正交表和混合水平正交表。</li>
      <li>表格超出屏幕宽度可水平滑动（PC端：shift + 滚轮）。</li>
      <li>有效分隔符：“,”、“|”、“;”、“\t“（制表符，表示为字母 t）。</li>
      <li>自动检测文字输入数据的分隔符，无需手动输入。</li>
      <li>手动输入分隔符可为数据指定一个新的分隔符。</li>
      <li>复制到剪贴板的数据可以直接粘贴到 Excel 等表格工具。</li>
    </ul>
  </tool-container>
</template>

<script>
import ToolContainer from '../components/tool-container.vue'

export default {
components: {
  ToolContainer
}
}
</script>