<template>
  <div class="page-render">
    <Fast2Render :option="option"></Fast2Render>
  </div>
</template>

<script>
// import widgetEmpty from './assets/widget-empty.png';
import Fast2Render from "./components/render/widget/fast2render";
export default {
  name: "PageRender",
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          column: []
        };
      }
    }
  },
  // components: { MohoRender, widgetEmpty },
  components: { Fast2Render }
};
</script>

<style lang="scss">
@import "./styles/index.scss";
.page-render {
  padding: 10px;
}
</style>
