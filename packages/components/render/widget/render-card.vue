<template>
  <div>
    <h4 class="widget-card__head" v-show="column.label">{{ column.label }}</h4>
    <template v-for="(item, groupIndex) in column.children.column">
      <el-col :key="groupIndex" :md="item.span || 12" :xs="24" :offset="item.offset || 0">
        <div
          class="widget-group__item"
          :label="item.label"
          :prop="item.prop"
          :class="{ active: selectWidget.prop == item.prop }"
        >
          <render-item :item="item"></render-item>
        </div>
      </el-col>
    </template>
  </div>
</template>
<script>
import RenderItem from './render-item';

export default {
  name: 'render-card',
  props: ['data', 'column', 'select', 'index'],
  components: { RenderItem },
  data() {
    return {
      selectWidget: this.select
    };
  }
};
</script>
