<template>
  <avue-crud :option="outputJson"></avue-crud>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-block',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          content: '<p>静态资源占位符号</p>',
          lable: 'lable',
          type: 'list',
          position: 'left',
          slug: '',
          outputJson: {}
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
  }
}

span.showdata a {
  text-decoration: underline;
}
</style>
