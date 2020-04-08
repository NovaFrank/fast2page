<template>
  <header>
    <h1 :class="item.className" v-if="item.headerlevel === 'h1'">{{ item.label }}</h1>
    <h2 :class="item.className" v-else-if="item.headerlevel === 'h2'">{{ item.label }}</h2>
    <h3 :class="item.className" v-else-if="item.headerlevel === 'h3'">{{ item.label }}</h3>
    <h4 :class="item.className" v-else-if="item.headerlevel === 'h4'">{{ item.label }}</h4>
    <h5 :class="item.className" v-else-if="item.headerlevel === 'h5'">{{ item.label }}</h5>
    <h6 :class="item.className" v-else>{{ item.label }}</h6>
  </header>
</template>
<script>
// 属性信息展示卡 - 单条模式
export default {
  name: 'item-header',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          text: '<p>静态资源占位符号</p>',
          headerlevel: 'h1',
          className: 'newheader'
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
