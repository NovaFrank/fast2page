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
    :slug="item.slug"
  ></component>
</template>
<script>
import itemBlock from '../cards/item-block';
import itemNormal from '../cards/item-normal';
import itemUrl from '../cards/item-url';
import itemMultiLine from '../cards/item-multi-line';
import itemImg from '../cards/item-img';
import itemHtml from '../cards/item-html';
import itemHeader from '../cards/item-header';
import itemDivider from '../cards/item-divider';
import itemButton from '../cards/item-button';
export default {
  name: 'widget-item',
  props: ['item'],
  data() {
    return {
      form: {},
      mycomponent: ''
    };
  },
  components: {
    itemNormal,
    itemUrl,
    itemMultiLine,
    itemImg,
    itemHtml,
    itemHeader,
    itemDivider,
    itemButton,
    itemBlock
  },
  methods: {
    getComponent(type, component) {
      let KEY_COMPONENT_NAME = 'item-';
      let result = 'normal';
      if (!this.validatenull(component)) result = component;
      else if (type === 'img') result = type;
      else if (type === 'url') result = type;
      else if (type === 'multi-line') result = type;
      else if (type === 'html') result = type;
      else if (type === 'header') result = type;
      else if (type === 'divider') result = type;
      else if (type === 'button') result = type;
      else if (type === 'block') result = type;
      this.mycomponent = KEY_COMPONENT_NAME + result;
      return this.mycomponent;
    }
  }
};
</script>
