<template>
  <div class="item" :class="'label__' + props.labelPosition">
    <span class="label">{{ props.label }}</span>
    <span class="showdata"
      >{{ props.prepend }}{{ data.value || '动态数值' }} {{ props.append }}</span
    >
  </div>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-multi-line',
  props: {
    props: {
      type: Object,
      default: function() {
        return {
          labelPosition: 'left',
          label: '标签',
          props: 'myprops'
        };
      }
    },
    data: {
      type: Object,
      default: function() {
        return {
          value: '动态数值'
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.label__top {
  span.lable {
    display: block;
  }
  span.showdata {
    display: block;
    margin-left: 10px;
  }
}
.label__left {
  span.lable {
    display: inline-block;
    width: 120px;
  }
  span.showdata {
    display: inline-block;
    margin-left: 10px;
    min-height: 40px;
  }
}
</style>
