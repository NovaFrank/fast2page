<template>
  <div>
    <avue-tabs :option="column.children" @change="handleChange"></avue-tabs>
    <div v-for="(tabitem, tabindex) in column.children.column" :key="tabitem.prop" class="content">
      <div v-if="openTab.prop === tabitem.prop">
        <template v-for="(item, groupIndex) in tabitem.children.column">
          <el-col
            class="widget-card"
            v-if="item.type == 'dynamic'"
            :key="groupIndex + tabindex"
            :md="item.span || 12"
            :xs="24"
          >
            <render-card
              :data="tabColumn.children"
              :column="item"
              :index="groupIndex"
              :select.sync="selectWidget"
            ></render-card>
          </el-col>
          <el-col
            v-else
            :key="groupIndex + tabindex"
            :md="item.span || 12"
            :xs="24"
            :offset="item.offset || 0"
          >
            <div class="widget-group__item" :label="item.label" :prop="item.prop">
              <render-item :item="item"></render-item>
            </div>
          </el-col>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import RenderCard from './render-card';
import RenderItem from './render-item';

export default {
  name: 'render-tab',
  props: ['data', 'column', 'select', 'index', 'tabs'],
  components: { RenderCard, RenderItem },
  data() {
    return {
      selectWidget: this.select,
      openTab: {},
      tabColumn: []
    };
  },
  created() {
    this.openTab = this.column.children.column[0];
    this.tabColumn = this.openTab.children.column;
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped></style>
