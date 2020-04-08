<template>
  <div class="item" :class="'label__' + item.labelPosition">
    <div class="content" v-html="item.content"></div>
  </div>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-html',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          content: '<p>静态资源占位符号</p>'
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
