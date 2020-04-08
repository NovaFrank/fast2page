<template>
  <div class="item" :class="'label__' + item.labelPosition">
    <span v-if="!item.hideLabel" class="label">{{ item.label }}</span>
    <span class="showdata">
      <img :width="item.width" :height="item.height" :src="item.url || urlDefault" />
    </span>
  </div>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-img',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          labelPosition: 'left',
          label: '标签',
          hideLabel: true,
          url: null,
          props: 'myprops',
          valueDefault: '动态数值'
        };
      }
    }
  },
  data() {
    return {
      urlDefault:
        'https://s3.amazonaws.com/creativetim_bucket/products/51/thumb/opt_mdp_thumbnail.jpg?1521134752'
    };
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
