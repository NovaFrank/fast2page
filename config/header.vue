<template>
  <div>
    <el-select v-model="data.headerlevel" placeholder="标题类型" style="width: 100%;">
      <el-option label="一级标题" value="h1"></el-option>
      <el-option label="二级标题" value="h2"></el-option>
      <el-option label="三级标题" value="h3"></el-option>
      <el-option label="四级标题" value="h4"></el-option>
      <el-option label="五级标题" value="h5"></el-option>
      <el-option label="六级标题" value="h6"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'config-header',
  props: ['data']
};
</script>
