<template>
  <el-button
    :width="item.width"
    :size="item.size"
    @click="buttonClick"
    :class="item.className"
    :type="item.buttonType"
    :icon="item.icon"
    >{{ item.label }}
  </el-button>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-button',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          label: '返回列表',
          headerlevel: 'h1',
          className: 'newheader',
          width: 200,
          size: 'small',
          buttonType: 'primary',
          icon: 'el-icon-arrow-left',
          actionText: '执行操作:返回列表',
          action: 'youclickme'
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
