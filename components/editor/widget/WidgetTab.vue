<template>
  <div>
    <avue-tabs :option="column.children" @change="handleChange"></avue-tabs>
    <div v-for="(tabitem, tabindex) in column.children.column" :key="tabitem.prop" class="content">
      <div v-if="openTab.prop === tabitem.prop">
        <draggable
          class="widget-group__body"
          :list="tabitem.children.column"
          :group="{ name: 'page' }"
          ghost-class="ghost"
          :animation="200"
          @add="handleWidgetTabAdd($event, tabitem)"
        >
          <template v-for="(item, groupIndex) in tabitem.children.column">
            <el-col
              class="widget-card"
              v-if="item.type == 'dynamic'"
              :key="groupIndex + tabindex"
              :md="item.span || 12"
              :xs="24"
              :class="{ active: selectWidget.prop == item.prop }"
              @click.stop="handleWidgetChildSelect(item)"
            >
              <widget-card
                :data="tabColumn.children"
                :column="item"
                :index="groupIndex"
                :select.sync="selectWidget"
              ></widget-card>
            </el-col>
            <el-col
              v-else
              :key="groupIndex + tabindex"
              :md="item.span || 12"
              :xs="24"
              :offset="item.offset || 0"
            >
              <div
                class="widget-group__item"
                :label="item.label"
                :prop="item.prop"
                :class="{ active: selectWidget.prop == item.prop }"
                @click.stop="handleWidgetChildSelect(item)"
              >
                <widget-item :item="item"></widget-item>
                <el-button
                  title="删除"
                  @click.stop="handleWidgetChildDelete(tabitem, groupIndex)"
                  class="widget-group__item--delete"
                  v-if="selectWidget.prop == item.prop"
                  circle
                  plain
                  type="danger"
                >
                  <i class="iconfont icon-delete"></i>
                </el-button>
                <el-button
                  title="复制"
                  @click.stop="handleWidgetChildClone(tabitem, item)"
                  class="widget-group__item--clone"
                  v-if="selectWidget.prop == item.prop"
                  circle
                  plain
                  type="primary"
                >
                  <i class="iconfont icon-copy"></i>
                </el-button>
              </div>
            </el-col>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import WidgetCard from './WidgetGroup';
import WidgetItem from './WidgetItem';
import Draggable from 'vuedraggable';

export default {
  name: 'widget-tab',
  props: ['data', 'column', 'select', 'index', 'tabs'],
  components: { Draggable, WidgetCard, WidgetItem },
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
    },
    handleWidgetChildSelect(data) {
      console.log('选中了元素', data);
      this.$emit('selectedChild');
      this.selectWidget = data;
    },
    handleChange(column) {
      this.openTab = column;
      this.tabColumn = this.openTab.children.column;
      this.$message.success(JSON.stringify(column));
    },
    handleWidgetChildClone(column, item) {
      console.log('要复制的元素', column, item);
      const data = this.deepClone(item);
      data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999);
      this.$set(column.children.column, column.children.column.length, { ...data });
      this.$nextTick(() => {
        this.selectWidget = column.children.column[column.children.column.length - 1];
      });
    },
    handleWidgetChildDelete(column, index) {
      if (column.children.column.length - 1 === index) {
        if (index === 0) this.selectWidget = column;
        else this.selectWidget = column.children.column[index - 1];
      } else this.selectWidget = column.children.column[index + 1];
      this.$nextTick(() => {
        column.children.column.splice(index, 1);
      });
    },
    handleWidgetTabAdd(evt, column) {
      console.log(column, '添加到元素');
      let newIndex = evt.newIndex;
      const item = evt.item;

      if (newIndex === 1 && newIndex > column.children.column.length - 1) newIndex = 0;
      if (['分组'].includes(item.textContent)) {
        column.children.column.splice(newIndex, 1);
        return;
      }

      const data = this.deepClone(column.children.column[newIndex]);
      if (!data.prop) data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999);
      delete data.icon;
      if (data.type === 'dynamic') data.span = 24;
      else data.span = 12;
      this.$set(column.children.column, newIndex, { ...data });
      this.selectWidget = column.children.column[newIndex];
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped></style>
