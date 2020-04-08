<template>
  <div>
    <el-container>
      <el-main>
        <template v-for="item in list">
          <template v-if="!item.hide">
            <template v-if="item.type === BLOCK_TYPE.BUTTONS">
              <!-- <avue-button-group :key="item.slug" :option="item.data"></avue-button-group> -->
            </template>
            <template v-else-if="item.type === BLOCK_TYPE.DETAIL">
              <avue-page-render
                :key="item.slug"
                :option="item.data"
                :data="ProviderData.fieldData"
              ></avue-page-render>
            </template>
            <template v-else-if="item.type === BLOCK_TYPE.FORM">
              <avue-form
                :key="item.slug"
                :option="item.data"
                v-model="ProviderData.fieldData"
                :ref="item.slug"
              >
                <template slot="menuLeft" slot-scope="{ row }">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-plus"
                    @click="addBtn(row)"
                    >添加</el-button
                  >
                </template>
              </avue-form>
            </template>
            <template v-else-if="item.type === BLOCK_TYPE.LIST">
              <avue-crud
                :key="item.slug"
                :option="item.data"
                @row-save="listRowSave"
                @row-del="listRowDel"
                @row-update="listRowUpdate"
                :data="ProviderData.tableData"
                v-model="tableData"
                :ref="item.slug"
              ></avue-crud>
            </template>
            <template v-else-if="item.type === BLOCK_TYPE.FIELD">
              <avue-form
                :key="item.slug"
                :option="item.data"
                v-model="ProviderData.fieldData"
                :ref="item.slug"
              ></avue-form>
            </template>
            <template v-else-if="item.type === BLOCK_TYPE.COMPONENT">
              <avue-component-render
                :key="item.slug"
                :componentsList="item.data"
                :ProviderData="ProviderData.componentData"
              ></avue-component-render>
            </template>
            <template v-else>
              <div :key="item.slug">
                <h5>无法解析数据：</h5>
                <code>
                  {{ item }}
                </code>
              </div>
            </template>
          </template>
        </template>
      </el-main>
    </el-container>
  </div>
</template>
<script>
/**
 * 界面配置总管理界面
 * 左侧 维护 所有可配数据列表
 * 主内容根据 可配数据类型 展示 表单，表格，详情，组件列表管理，可选择设置对应的数据
 * 进入屏蔽其他操作状态，单纯进行布局， 保存 及 发布 ， 可维护类型为 表格 表单 详情， 组合， 可 维护 模版 页面  模块
 * block 内含一组组件
 */
const BLOCK_TYPE = {
  LIST: "crud",
  FORM: "form",
  DETAIL: "detail",
  FIELD: "field",
  BUTTONS: "button",
  COMPONENT: "block"
};

export default {
  name: "ComponentRender",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    ProviderData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      BLOCK_TYPE,
      testDetaiData: {
        id: 1,
        name: "测试",
        code: "test"
      },
      tableObj: {},
      tableData: {}
    };
  },
  methods: {
    addBtn() {
      this.$refs.form.rowAdd();
    },
    listRowUpdate(row, index, done, loading) {
      // 行修改
      this.$set(this.ProviderData.tableData, index, row);
      done();
    },
    listRowSave(payload, done) {
      this.ProviderData.tableData.push(payload);
      done();
    },
    listRowDel(payload) {
      this.ProviderData.tableData.splice(payload.index, 1);
    }
  }
};
</script>
<style scope></style>
