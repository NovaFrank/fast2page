<template>
  <div>
    <el-form-item label="是否可拖拽（需引入sortable.js）" v-if="data.multiple">
      <el-switch v-model="data.drag"></el-switch>
    </el-form-item>
    <draggable tag="ul" :list="data.children.column" ghost-class="ghost" handle=".drag-item">
      <li v-for="(item, index) in data.children.column" :key="index">
        <i
          class="drag-item el-icon-s-operation"
          style="font-size: 16px; margin: 0 5px; cursor: move;"
        ></i>
        <el-input
          style="margin-right: 5px;"
          size="mini"
          v-model="item.label"
          placeholder="label"
        ></el-input>
        <el-input size="mini" v-model="item.prop" placeholder="name"></el-input>
        <el-input size="mini" v-model="item.icon" placeholder="icon"></el-input>
        <el-button
          @click="handleRemoveFields(index)"
          circle
          plain
          type="danger"
          size="mini"
          icon="el-icon-minus"
          style="padding: 4px;margin-left: 5px;"
        ></el-button>
      </li>
    </draggable>
    <div style="margin-left: 22px;">
      <el-button type="text" @click="handleAddFields">添加列 </el-button>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  name: 'config-tab',
  props: ['data'],
  components: { Draggable },
  data() {
    return {
      option: {
        column: [
          {
            prop: 'tab1',
            label: '标签一',
            children: {}
          },
          {
            prop: 'tab2',
            label: '标签二'
          }
        ]
      }
    };
  },
  methods: {
    handleRemoveFields(index) {
      this.data.children.column.splice(index, 1);
    },
    handleAddFields() {
      const i = Math.ceil(Math.random() * 999);
      let newitem = {
        label: `标签${i}`,
        prop: `tab_${i}`,
        icon: 'el-icon-question',
        children: { prop: `content-${i}`, column: [] }
      };
      this.data.children.column.push(newitem);
    }
  },
  watch: {}
};
</script>
