<template>
  <div>
    <el-form-item label="对齐方式">
      <el-select v-model="data.children.align" placeholder="对齐方式">
        <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>
        <el-option label="居右" value="right"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="头部对齐方式">
      <el-select v-model="data.children.headerAlign" placeholder="对齐方式">
        <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>
        <el-option label="居右" value="right"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="绑定数据对象">
      <el-input v-model="data.datasources" placeholder="数据对象名称"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'config-dynamic',
  props: ['data']
};
</script>
