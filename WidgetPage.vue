<template>
  <div class="widget-container">
    <div
      :label-position="data.labelPosition || 'left'"
      :label-width="data.labelWidth ? `${data.labelWidth}px` : '100px'"
      :label-suffix="data.labelSuffix"
      ref="widgetPage"
      size="small"
    >
      <el-row :gutter="data.gutter">
        <draggable
          class="widget-list"
          :list="data.column"
          :group="{ name: 'page' }"
          ghost-class="ghost"
          :animation="300"
          @add="handleWidgetAdd"
        >
          <template v-for="(column, index) in data.column">
            <el-col
              class="widget-card"
              v-if="column.type == 'dynamic'"
              :key="index"
              :md="column.span || 12"
              :xs="24"
              :class="{ active: selectWidget.prop == column.prop }"
              @click.native="handleSelectWidget(index)"
            >
              <widget-card
                :data="data"
                :column="column"
                :index="index"
                :select.sync="selectWidget"
              ></widget-card>
            </el-col>
            <el-col
              class="widget-group"
              v-else-if="column.type == 'group'"
              :key="index"
              :md="column.span || 12"
              :xs="24"
              :class="{ active: selectWidget.prop == column.prop }"
              @click.native="handleSelectWidget(index)"
            >
              <widget-group
                :data="data"
                :column="column"
                :index="index"
                :select.sync="selectWidget"
              >
              </widget-group>
            </el-col>
            <el-col
              class="button-group"
              v-else-if="column.type == 'button-group'"
              :key="index"
              :md="column.span || 12"
              :xs="24"
              :class="{ active: selectWidget.prop == column.prop }"
              @click.native="handleSelectWidget(index)"
            >
              <button-group
                :data="data"
                :column="column"
                :index="index"
                :select.sync="selectWidget"
              >
              </button-group>
            </el-col>
            <el-col
              class="widget-tab"
              v-else-if="column.type == 'tab'"
              :key="index"
              :md="column.span || 12"
              :xs="24"
              :class="{ active: selectWidget.prop == column.prop }"
              @click.native="handleSelectWidget(index)"
            >
              <widget-tab
                :data="data"
                :column="column"
                :index="index"
                :select.sync="selectWidget"
                @selectedChild="clearSelectWidget"
              >
              </widget-tab>
              <el-button
                title="删除"
                @click.stop="handleWidgetDelete(index)"
                v-if="selectWidget.prop == column.prop"
                class="widget-action-delete"
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
                v-if="selectWidget.prop == column.prop"
                class="widget-action-clear"
                circle
                plain
                size="small"
                type="warning"
              >
                <i class="iconfont icon-clear"></i>
              </el-button>
            </el-col>
            <el-col
              v-else
              :key="index"
              :md="column.span || 12"
              class="widget-item"
              :class="{ active: selectWidget.prop == column.prop }"
              :xs="24"
              @click.native="handleSelectWidget(index)"
            >
              <widget-item
                :column="column"
                :item="column"
                :index="index"
                :label="column.label"
                :prop="column.prop"
                :select.sync="selectWidget"
              >
              </widget-item>
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
                title="复制"
                @click.stop="handleWidgetClone(index)"
                class="widget-action-clone"
                v-if="selectWidget.prop == column.prop"
                circle
                plain
                size="small"
                type="primary"
              >
                <i class="iconfont icon-copy"></i>
              </el-button>
            </el-col>
          </template>
        </draggable>
      </el-row>
    </div>
  </div>
</template>

<script>
import WidgetItem from './components/editor/widget/WidgetItem';
import WidgetCard from './components/editor/widget/WidgetCard';
import WidgetGroup from './components/editor/widget/WidgetGroup';
import WidgetTab from './components/editor/widget/WidgetTab';
import ButtonGroup from './components/editor/widget/ButtonGroup';
import Draggable from 'vuedraggable';

export default {
  name: 'widget-page',
  components: { Draggable, WidgetItem, WidgetCard, WidgetGroup, WidgetTab, ButtonGroup },
  props: ['data', 'select'],
  data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.column[index];
    },
    clearSelectWidget() {
      this.selectWidget = null;
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex;
      const data = this.deepClone(this.data.column[newIndex]);
      if (!data.prop) data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999);
      delete data.icon;
      delete data.subfield;
      this.$set(this.data.column, newIndex, { ...data });
      this.handleSelectWidget(newIndex);
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
    handleWidgetClone(index) {
      let cloneData = this.deepClone(this.data.column[index]);
      cloneData.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999);
      this.data.column.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1);
      });
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
