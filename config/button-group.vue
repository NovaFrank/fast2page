<template>
  <div>
    <el-form-item label="样式风格">
      <el-select v-model="data.style" placeholder="样式风格" style="width: 100%;">
        <el-option label="默认" value="none"></el-option>
        <el-option label="朴素按钮" value="plain"></el-option>
        <el-option label="圆角按钮" value="round"></el-option>
        <el-option label="圆形图标按钮" value="circle"></el-option>
        <el-option label="检查加载" value="loading"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'config-button-group',
  props: ['data']
};
</script>
