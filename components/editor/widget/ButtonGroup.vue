<template>
  <el-button-group>
    <draggable
      class="button-group__body"
      :list="column.children.column"
      :group="{ name: 'page' }"
      ghost-class="ghost"
      :animation="200"
      @add="handleWidgetGroupAdd($event, column)"
    >
      <template v-for="item in column.children.column">
        <div
          class="button-group__item"
          :key="item.props"
          :label="item.label"
          :prop="item.prop"
          :class="{ active: selectWidget.prop == item.prop }"
          @click.stop="handleWidgetChildSelect(item)"
        >
          <widget-item v-if="item.type === 'button'" :item="item"></widget-item>
          <el-button
            title="删除"
            @click.stop="handleWidgetChildDelete(index)"
            class="button-group__item--delete"
            v-if="selectWidget.prop == item.prop"
            circle
            plain
            size="small"
            type="danger"
          >
            <i class="iconfont icon-delete"></i>
          </el-button>
          <el-button
            title="复制"
            @click.stop="handleWidgetChildClone(index)"
            class="button-group__item--clone"
            v-if="selectWidget.prop == item.prop"
            circle
            plain
            size="small"
            type="primary"
          >
            <i class="iconfont icon-copy"></i>
          </el-button>
        </div>
      </template>
    </draggable>
    <div class="tools">
      <el-button
        title="删除"
        @click.stop="handleWidgetDelete(index)"
        class="widget-action-delete"
        v-if="selectWidget.prop == column.prop"
        circle
        plain
        size="small"
        type="danger"
      >
        <i class="iconfont icon-delete"></i>
      </el-button>
      <el-button
        title="清空"
        @click.stop="handleWidgetClear(index)"
        class="widget-action-clear"
        v-if="selectWidget.prop == column.prop"
        circle
        plain
        size="small"
        type="warning"
      >
        <i class="iconfont icon-clear"></i>
      </el-button>
      <el-button
        title="复制"
        @click.stop="handleWidgetCloneTable(index)"
        class="widget-action-clone"
        v-if="selectWidget.prop == column.prop"
        circle
        plain
        size="small"
        type="primary"
      >
        <i class="iconfont icon-copy"></i>
      </el-button>
    </div>
  </el-button-group>
</template>
<script>
import WidgetItem from './WidgetItem';

export default {
  name: 'button-group',
  props: ['data', 'column', 'select', 'index'],
  components: { WidgetItem },
  data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.column[index];
    },
    handleWidgetClear(index) {
      this.data.column[index].children.column = [];
      this.selectWidget = this.data.column[index];
    },
    handleWidgetDelete(index) {
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {};
        else this.handleSelectWidget(index - 1);
      } else this.handleSelectWidget(index + 1);

      this.$nextTick(() => {
        this.data.column.splice(index, 1);
      });
    },
    handleWidgetChildSelect(data) {
      this.selectWidget = data;
    },
    handleWidgetChildClone(column, item) {
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
    handleWidgetGroupAdd(evt, column) {
      let newIndex = evt.newIndex;
      const item = evt.item;
      if (item.textContent !== '按钮') {
        const h = this.$createElement;
        this.$notify({
          title: '只允许按钮',
          message: h('i', { style: 'color: teal' }, '按钮组只能使用按钮元素')
        });
        return false;
      }
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
