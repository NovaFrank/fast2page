<template>
  <div>
    <h4 class="widget-group__head" v-show="column.label">
      <i :class="column.icon" v-show="column.icon" style="margin-right: 10px;"></i
      >{{ column.label }}
    </h4>

    <template v-for="(item, groupIndex) in column.children.column">
      <el-col
        class="widget-card"
        v-if="item.type == 'dynamic'"
        :key="groupIndex"
        :md="item.span || 12"
        :xs="24"
        :class="{ active: selectWidget.prop == item.prop }"
        @click.stop="handleWidgetChildSelect(item)"
      >
        <render-card
          :data="column.children"
          :column="item"
          :index="groupIndex"
          :select.sync="selectWidget"
        ></render-card>
      </el-col>
      <el-col v-else :key="groupIndex" :md="item.span || 12" :xs="24" :offset="item.offset || 0">
        <div
          class="widget-group__item"
          :label="item.label"
          :prop="item.prop"
          :class="{ active: selectWidget.prop == item.prop, required: item.required }"
          @click.stop="handleWidgetChildSelect(item)"
        >
          <render-item :item="item"></render-item>
        </div>
      </el-col>
    </template>
  </div>
</template>
<script>
import RenderItem from './render-item';
import RenderCard from './render-card';

export default {
  name: 'render-group',
  props: ['data', 'column', 'select', 'index'],
  components: { RenderItem, RenderCard },
  data() {
    return {
      selectWidget: this.select
    };
  }
};
</script>
