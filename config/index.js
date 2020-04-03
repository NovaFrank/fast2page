import Input from './input.vue';
import Normal from './normal.vue';
import Img from './img.vue';
import Html from './html.vue';
import Header from './header.vue';
import Textarea from './textarea.vue';
import Dynamic from './dynamic.vue';
import Switch from './switch.vue';
import Rate from './rate.vue';
import Slider from './slider.vue';
import Color from './color.vue';
import Radio from './radio.vue';
import Checkbox from './checkbox.vue';
import Select from './select.vue';
import Cascader from './cascader.vue';
import Tree from './tree.vue';
import Date from './date.vue';
import UEditor from './ueditor.vue';
import Map from './map.vue';
import Group from './group.vue';
import Array from './array.vue';
import Tab from './tab.vue';
import Divider from './divider.vue';
import Button from './button.vue';
import ButtonGroup from './button-group.vue';
import Block from './block.vue';

const components = [
  Block,
  Normal,
  Img,
  Input,
  Textarea,
  Dynamic,
  Switch,
  Rate,
  Slider,
  Color,
  Radio,
  Checkbox,
  Select,
  Cascader,
  Tree,
  Date,
  UEditor,
  Map,
  Group,
  Tab,
  Array,
  Html,
  Header,
  Divider,
  Button,
  ButtonGroup
];

const Config = {
  install(Vue) {
    if (this.installed) return;
    this.installed = true;

    components.map((component) => {
      Vue.component(component.name, component);
    });
  }
};

export default Config;
