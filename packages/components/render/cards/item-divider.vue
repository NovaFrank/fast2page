<template>
  <el-divider :content-position="item.position">{{ item.lable }}</el-divider>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-divider',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          lable: 'lable',
          position: 'left'
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
