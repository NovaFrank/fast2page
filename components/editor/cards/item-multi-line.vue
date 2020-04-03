<template>
  <div class="item" :class="'label__' + props.labelPosition">
    <span class="label">{{ props.label }}</span>
    <span class="showdata">{{ props.prepend }}{{ props.defaultValue }} {{ props.append }}</span>
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
          labelPosition: 'top',
          label: '标签',
          props: 'myprops',
          defaultValue: '多行文本展示预览设置，用于展示1000字以内的简介等内容'
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
span.lable {
  display: block;
  width: 100%;
}
span.showdata {
  display: block;
  margin-left: 10px;
}
</style>
