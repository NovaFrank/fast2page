<template>
  <component
    :is="getComponent(item.type, item.component)"
    :item="item"
    :append="item.append"
    :accordion="item.accordion"
    :typeslot="item.typeslot"
    :border="item.border"
    :clearable="item.clearable"
    :click="item.click"
    :defaultTime="item.defaultTime"
    :tpyeformat="item.tpyeformat"
    :filterable="item.filterable"
    :format="item.format"
    :formatTooltip="item.formatTooltip"
    :iconClasses="item.iconClasses"
    :label="item.label"
    :listType="item.listType"
    :loadText="item.loadText"
    :nodeClick="item.nodeClick"
    :parent="item.parent"
    :prop="item.prop"
    :props="item.props"
    :iconList="item.iconList"
    :showText="item.showText"
    :size="item.size || 'small'"
    :suffixIcon="item.suffixIcon"
    :texts="item.texts"
    :tip="item.tip"
    :type="item.type"
    :tags="item.tags"
    :value-format="item.valueFormat"
    :voidIconClass="item.voidIconClass"
    :is-img="item.isImg"
  ></component>
</template>
<script>
import itemNormal from '../cards/item-normal';
import itemUrl from '../cards/item-url';
import itemMultiLine from '../cards/item-multi-line';
import itemImg from '../cards/item-img';
import itemHtml from '../cards/item-html';
import itemHeader from '../cards/item-header';

export default {
  name: 'render-item',
  props: ['item'],
  data() {
    return {
      form: {},
      mycomponent: ''
    };
  },
  components: { itemNormal, itemUrl, itemMultiLine, itemImg, itemHtml, itemHeader },
  methods: {
    getComponent(type, component) {
      let KEY_COMPONENT_NAME = 'item-';
      let result = 'normal';
      if (!this.validatenull(component)) result = component;

      // 已定义组件列表
      let existType = ['img', 'url', 'multi-line', 'html', 'header', 'divider'];
      if (existType.includes(type)) result = type;

      this.mycomponent = KEY_COMPONENT_NAME + result;
      return this.mycomponent;
    }
  }
};
</script>
