
import PageRender from './render.vue';
import ComponentRender from './components/render/componentRender.vue';
import ButtonsRender from './components/render/widget/render-button-group.vue';

export default {
  install(Vue) {
    Vue.component('Fast2' + PageRender.name, PageRender);
    Vue.component('Fast2' + ComponentRender.name, ComponentRender);
    Vue.component('Fast2' + ButtonsRender.name, ButtonsRender);
  }
};
