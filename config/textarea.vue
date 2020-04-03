<template>
  <div>
    <el-form-item label="默认值">
      <el-input v-model="data.valueDefault" placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="是否空值可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'config-textarea',
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      }
    };
  },
  methods: {},
  watch: {}
};
</script>
