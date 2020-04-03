<template>
  <div class="page-container">
    <div ref="widgetPage" size="small">
      <el-row :gutter="option.gutter">
        <template v-for="(column, index) in option.column">
          <el-col
            class="widget-card"
            v-if="column.type == 'dynamic'"
            :key="index"
            :md="column.span || 12"
            :xs="24"
          >
            <render-card :data="data" :column="column" :index="index"></render-card>
          </el-col>
          <el-col
            class="widget-group"
            v-else-if="column.type == 'group'"
            :key="index"
            :md="column.span || 12"
            :xs="24"
          >
            <render-group :data="data" :column="column" :index="index"> </render-group>
          </el-col>
          <el-col
            class="widget-tab"
            v-else-if="column.type == 'tab'"
            :key="index"
            :md="column.span || 12"
            :xs="24"
          >
            <render-tab :data="data" :column="column" :index="index"> </render-tab>
          </el-col>
          <el-col v-else :key="index" :md="column.span || 12" class="widget-item" :xs="24">
            <render-item
              :column="column"
              :item="column"
              :index="index"
              :label="column.label"
              :prop="column.prop"
            >
            </render-item>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script>
import RenderItem from './render-item';
import RenderCard from './render-card';
import RenderGroup from './render-group';
import RenderTab from './render-tab';

export default {
  name: 'moho-render',
  components: { RenderItem, RenderCard, RenderGroup, RenderTab },
  props: ['option', 'data'],
  data() {
    return {
      selectWidget: this.select
    };
  }
};
</script>
