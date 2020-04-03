<template>
  <div>
    <el-form-item label="宽度">
      <el-input v-model="data.width" placeholder="设置固定宽度"></el-input>
    </el-form-item>
    <el-form-item label="高度">
      <el-input v-model="data.height" placeholder="设置固定高度"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input
        v-model="data.content"
        type="textarea"
        :rows="4"
        placeholder="请填写内容，支持html"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'config-html',
  props: ['data']
};
</script>
