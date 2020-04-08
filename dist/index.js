import Config from './config';
import PageDesign from './index.vue';
import PageRender from './render.vue';
import ComponentRender from './components/render/componentRender.vue';
import ButtonsRender from './components/render/widget/render-button-group.vue';

export default {
  install(Vue) {
    Vue.use(Config);
    Vue.component('Avue' + PageDesign.name, PageDesign);
    Vue.component('Avue' + PageRender.name, PageRender);
    Vue.component('Avue' + ComponentRender.name, ComponentRender);
    Vue.component('Avue' + ButtonsRender.name, ButtonsRender);
  }
};
