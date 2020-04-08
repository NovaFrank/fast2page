<template>
  <div :class="align">
    <el-button
      v-for="item of option"
      :class="item.align"
      :key="item.name"
      :icon="item.icon"
      :size="item.size"
      :type="item.type"
      :disabled="item.disabled"
      :round="item.round"
      @click.stop="doAction(item.action, item)"
      >{{ item.label }}</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  inheritAttrs: false,
  props: {
    align: {
      type: String,
      default: 'btns-right'
    },
    option: {
      type: Array,
      default: () => {
        return [
          {
            name: 'btn-add',
            label: '添加',
            icon: 'el-icon-plus',
            size: 'small',
            type: 'primary',
            disabled: false,
            round: false,
            action: 'item-add',
            align: 'btn-right'
          }
        ];
      }
    }
  },
  methods: {
    doAction(action, data) {
      this.$emit(action, data);
      // this.$message.success(action)
    }
  }
};
</script>

<style scoped>
.btns-right .btn-right,
.btns-left .btn-right {
  float: right;
  margin-left: 10px;
}
.btns-right .btn-left,
.btns-left .btn-left {
  float: left;
  margin-right: 10px;
}
.btns-left {
  text-align: left;
}
.btns-right {
  text-align: right;
}
.btns-center {
  text-align: center;
}
</style>
