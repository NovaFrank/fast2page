<template>
  <div class="item" :class="'label__' + item.labelPosition">
    <span class="label">{{ item.label }} :</span>
    <span class="showdata">{{ item.prepend || '' }} {{ '动态数值' }} {{ item.append || '' }}</span>
  </div>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-normal',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          labelPosition: 'left',
          label: '标签',
          props: 'myprops',
          valueDefault: '动态数值',
          prepend: null,
          append: null
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
</style>
