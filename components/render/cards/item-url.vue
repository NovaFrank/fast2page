<template>
  <div class="item" :class="'label__' + item.labelPosition">
    <span class="label">{{ item.label }}</span>
    <span class="showdata"
      ><el-link :href="item.url || '#'">{{ data.value || '动态数值' }}</el-link></span
    >
  </div>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-url',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          labelPosition: 'left',
          label: '标签',
          props: 'myprops',
          url: '#',
          valueDefault: '动态数值'
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
    a {
      text-decoration: underline;
    }
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
    a {
      text-decoration: underline;
    }
  }
}
</style>
