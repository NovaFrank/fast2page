<template>
  <div>
    <el-form-item label="按钮类型">
      <el-select v-model="data.type" placeholder="按钮类型" style="width: 100%;">
        <el-option label="主要按钮" value="primary"></el-option>
        <el-option label="成功按钮" value="success"></el-option>
        <el-option label="信息按钮" value="info"></el-option>
        <el-option label="警告按钮" value="warning"></el-option>
        <el-option label="危险按钮" value="danger"></el-option>
        <el-option label="文字按钮" value="text"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="样式风格">
      <el-select v-model="data.style" placeholder="样式风格" style="width: 100%;">
        <el-option label="默认" value="none"></el-option>
        <el-option label="朴素按钮" value="plain"></el-option>
        <el-option label="圆角按钮" value="round"></el-option>
        <el-option label="圆形图标按钮" value="circle"></el-option>
        <el-option label="检查加载" value="loading"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图标">
      <avue-icon-select
        v-model="data.icon"
        :icon-list="iconList"
        placeholder="图标"
      ></avue-icon-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'config-button',
  props: ['data']
};
</script>
