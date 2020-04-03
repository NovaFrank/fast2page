<template>
  <div>
    <el-form-item label="宽度">
      <el-input v-model="data.width" placeholder="设置固定宽度"></el-input>
    </el-form-item>
    <el-form-item label="高度">
      <el-input v-model="data.height" placeholder="设置固定高度"></el-input>
    </el-form-item>
    <el-form-item label="隐藏标题">
      <el-switch v-model="data.hideLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否空值可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="绑定值">
      <el-input v-model="data.prop" placeholder="值格式化"></el-input>
    </el-form-item> -->
    <el-form-item label="值格式化">
      <el-input v-model="data.valueFormat" placeholder="值格式化"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'config-img',
  props: ['data']
};
</script>
