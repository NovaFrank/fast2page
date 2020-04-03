<template>
  <div>
    <el-form-item label="前缀">
      <el-input v-model="data.prepend" placeholder="前缀"></el-input>
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="data.append" placeholder="后缀"></el-input>
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
  name: 'config-input',
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
  methods: {
    generateRule() {
      const rules = [];
      Object.keys(this.validator).forEach((key) => {
        if (this.validator[key]) rules.push(this.validator[key]);
      });
      this.data.rules = rules;
    }
  },
  watch: {
    'data.pattern': function(val) {
      if (val)
        this.validator.pattern = {
          pattern: new RegExp(val),
          message: `${this.data.label}格式不匹配`
        };
      else this.validator.pattern = null;

      // delete this.data.pattern
      this.generateRule();
    }
  }
};
</script>
