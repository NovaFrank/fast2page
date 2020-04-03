<template>
  <div>
    <el-form-item label="标题对齐方式">
      <el-select v-model="data.postion" placeholder="对齐方式">
        <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>
        <el-option label="居右" value="right"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'config-html',
  props: ['data']
};
</script>
