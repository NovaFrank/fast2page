<template>
  <div class="form-config-container">
    <el-form label-position="left" label-suffix="：" label-width="130px" size="small">
      <el-form-item label="标签对齐方式">
        <el-select v-model="data.labelPosition" placeholder="标签对齐方式">
          <el-option label="左对齐" value="left"></el-option>
          <el-option label="右对齐" value="right"></el-option>
          <el-option label="顶部对齐" value="top"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段宽度">
        <el-input-number
          v-model="data.labelWidth"
          :min="80"
          :max="200"
          :step="10"
          controls-position="right"
          placeholder="表单字段宽度"
          style="width: 100%"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="项之间的间隔">
        <el-input-number
          v-model="data.gutter"
          :min="0"
          :max="60"
          :step="5"
          controls-position="right"
          placeholder="项之间的间隔"
          style="width: 100%"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'page-config',
  props: ['data']
};
</script>
