<template>
  <div class="page-designer">
    <el-container>
      <el-aside :width="leftWidth">
        <div class="fields-list">
          <div v-for="(field, index) in fields" :key="index">
            <div v-if="!field.disabled">
              <div class="field-title">{{ field.title }}</div>
              <draggable
                tag="ul"
                :list="field.list"
                :group="{ name: 'page', pull: 'clone', put: false }"
                ghost-class="ghost"
                :sort="false"
              >
                <li class="field-label" v-for="(item, index) in field.list" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                  </a>
                </li>
              </draggable>
            </div>
            <div v-else>
              <div class="field-title">
                {{ field.title }}
                <span class="danger">（开发中）</span>
              </div>
              <ul>
                <li class="field-label-disabled" v-for="(item, index) in field.list" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-aside>
      <!-- 中间主布局 -->
      <el-container class="widget-page-container" direction="vertical">
        <el-header class="widget-container-header" v-if="!disableToolBar">
          <el-row>
            <el-col :span="24">
              <el-button
                type="text"
                size="medium"
                icon="el-icon-download"
                @click="handleGenerateJson"
                >查看数据</el-button
              >
              <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview"
                >预览</el-button
              >
            </el-col>
          </el-row>
        </el-header>
        <el-main
          :style="{
            background: widgetPage.column.length == 0 ? `url(${widgetEmpty}) no-repeat 50%` : ''
          }"
        >
          <widget-page
            ref="widgetPage"
            :data="widgetPage"
            :select.sync="widgetPageSelect"
          ></widget-page>
        </el-main>
      </el-container>
      <!-- 右侧配置 -->
      <el-aside class="widget-config-container" :width="asideRightWidth">
        <el-tabs v-model="configTab" stretch>
          <el-tab-pane label="组件属性" name="widget" style="padding: 0 10px;">
            <widget-config :data="widgetPageSelect"></widget-config>
          </el-tab-pane>
          <el-tab-pane label="页面属性" name="page" lazy style="padding: 0 10px;">
            <page-config :datasources="datasources" :data="widgetPage"></page-config>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <!-- 生成JSON -->
      <el-drawer
        title="生成数据"
        :visible.sync="generateJsonVisible"
        size="50%"
        :modal-append-to-body="false"
        destroy-on-close
      >
        <v-json-editor v-model="widgetPagePreview" height="82vh"></v-json-editor>
        <div class="drawer-foot">
          <el-button size="medium" type="primary" @click="handleGenerate">保存</el-button>
          <el-button size="medium" @click="handleCopy">复制</el-button>
        </div>
      </el-drawer>
      <!-- 预览 -->
      <el-drawer
        title="预览"
        :visible.sync="previewVisible"
        :modal-append-to-body="false"
        size="60%"
        :before-close="handleBeforeClose"
      >
        <page-render
          v-if="previewVisible"
          class="preview-form"
          :option="widgetPagePreview"
          v-model="widgetModels"
        ></page-render>
        <div class="drawer-foot">
          <el-button size="medium" type="primary" @click="handlePreviewSubmit">确定</el-button>
          <el-button size="medium" type="danger" @click="handleBeforeClose">取消</el-button>
        </div>
      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import VJsonEditor from 'v-jsoneditor';
import fields from './fieldsConfig.js';
import WidgetPage from './WidgetPage';
import PageConfig from './PageConfig';
import WidgetConfig from './WidgetConfig';
import PageRender from './render';
import widgetEmpty from './assets/widget-empty.png';

export default {
  name: 'PageDesign',
  components: { Draggable, VJsonEditor, WidgetPage, PageConfig, WidgetConfig, PageRender },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          column: []
        };
      }
    },
    storage: {
      type: Boolean,
      default: false
    },
    disableToolBar: {
      type: Boolean,
      default: false
    },
    asideLeftWidth: {
      type: [String, Number],
      default: '270px'
    },
    pages: {
      type: Array,
      default: () => {
        return [];
      }
    },
    datasources: {
      type: Array,
      default: () => {
        return [];
      }
    },
    asideRightWidth: {
      type: [String, Number],
      default: '380px'
    }
  },
  watch: {
    options: {
      handler(val) {
        this.transAvueOptionsToFormDesigner(val).then((res) => {
          this.widgetPage = { ...this.widgetPage, ...res };
        });
      },
      deep: true
    }
  },
  computed: {
    leftWidth() {
      if (typeof this.asideLeftWidth === 'string') {
        return this.asideLeftWidth;
      } else {
        return `${this.asideLeftWidth}px`;
      }
    },
    rightWidth() {
      if (typeof this.asideRightWidth === 'string') {
        return this.asideRightWidth;
      } else {
        return `${this.asideRightWidth}px`;
      }
    }
  },
  data() {
    return {
      widgetEmpty,
      fields,
      widgetPage: {
        column: [],
        labelPosition: 'left',
        labelWidth: 120,
        gutter: 0,
        menuPosition: 'center',
        dataset: [] // 数据源定义
      },
      widgetPagePreview: {},
      configTab: 'widget',
      widgetPageSelect: {},
      previewVisible: false,
      generateJsonVisible: false,
      importJsonVisible: false,
      importJson: {},
      widgetModels: {}
    };
  },
  mounted() {
    this.handleLoadCss();
    this.handleLoadStorage();
    this.handlePageConfig(this.options);
    // TODO: 'handlerSave' is not defined.
    // this.$root.$on('do-save', handlerSave);
  },
  methods: {
    // 组件初始化时加载本地存储中的options(需开启storage),若不存在则读取用户配置的options
    handleLoadStorage() {
      if (this.storage) {
        const page = localStorage.getItem('avue-page');
        if (page) this.widgetPage = JSON.parse(page);
      } else {
        this.transAvueOptionsToFormDesigner(this.options).then((res) => {
          this.widgetPage = { ...this.widgetPage, ...res };
        });
      }
    },
    // 加载阿里iconfront
    handleLoadCss() {
      const url = '//at.alicdn.com/t/font_1254447_rwaizg76pz.css';
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      window.document.head.appendChild(link);
    },
    // 预览 - 弹窗
    handlePreview() {
      this.transformToAvueOptions(this.widgetPage).then((data) => {
        this.widgetPagePreview = data;
        this.previewVisible = true;
      });
    },
    // 生成JSON - 弹窗
    handleGenerateJson() {
      this.transformToAvueOptions(this.widgetPage).then((data) => {
        this.widgetPagePreview = data;
        this.generateJsonVisible = true;
      });
    },
    // 执行保存
    handlerSave() {
      this.transformToAvueOptions(this.widgetPage).then((data) => {
        this.$emit('design-save', data);
      });
    },
    // 生成JSON - 弹窗 - 确定
    handleGenerate() {
      this.transformToAvueOptions(this.widgetPage).then((data) => {
        this.$emit('design-update', data);
      });
    },
    // 生成JSON - 弹窗 - 拷贝
    handleCopy() {
      this.$Clipboard({
        text: JSON.stringify(this.widgetPagePreview, null, 2)
      })
        .then(() => {
          this.$message.success('复制成功');
        })
        .catch(() => {
          this.$message.error('复制失败');
        });
    },
    // 预览 - 弹窗 - 确定
    handlePreviewSubmit() {
      this.$refs.page.validate((valid) => {
        if (valid) this.$alert(this.widgetModels).catch(() => {});
      });
    },
    // 预览 - 弹窗 - 关闭前
    handleBeforeClose() {
      this.previewVisible = false;
    },
    // 表单设计器配置项 转化为 Avue配置项
    transformToAvueOptions(obj) {
      return new Promise((resolve, reject) => {
        try {
          const data = this.deepClone(obj);
          for (let i = 0; i < data.column.length; i++) {
            const col = data.column[i];
            if (
              col.type === 'dynamic' &&
              col.children &&
              col.children.column &&
              col.children.column.length > 0
            ) {
              const c = col.children.column;
              c.forEach((item) => {
                delete item.subfield;
              });
              this.transformToAvueOptions(col.children).then((res) => {
                col.children = res;
              });
            } else if (col.type === 'group') {
              if (!data.group) data.group = [];

              const group = {
                label: col.label,
                icon: col.icon,
                prop: col.prop
              };
              this.transformToAvueOptions(col.children).then((res) => {
                group.column = res.column;
                data.group.push(group);
              });
              data.column.splice(i, 1);
              i--;
            } else if (['checkbox', 'radio', 'tree', 'cascader', 'select'].includes(col.type)) {
              if (col.dicOption === 'static') {
                delete col.dicUrl;
                delete col.dicMethod;
                delete col.dicQuery;
              } else if (col.dicOption === 'remote') {
                delete col.dicData;
                if (col.dicQuery && col.dicQuery.length > 0) {
                  const query = {};
                  col.dicQuery.forEach((q) => {
                    if (q.key && q.value) query[q.key] = q.value;
                  });
                  col.dicQuery = query;
                } else delete col.dicQuery;
              }
              delete col.dicOption;
            } else if (['upload'].includes(col.type)) {
              if (col.headers && col.headers.length > 0) {
                const headers = {};
                col.headers.forEach((h) => {
                  if (h.key && h.value) headers[h.key] = h.value;
                });
                col.headers = headers;
              }

              if (col.data && col.data.length > 0) {
                const data = {};
                col.data.forEach((h) => {
                  if (h.key && h.value) data[h.key] = h.value;
                });
                col.data = data;
              }
            }
          }
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    },
    // Avue配置项 转化为 表单设计器配置项
    transAvueOptionsToFormDesigner(obj) {
      const data = this.deepClone(obj);
      return new Promise((resolve, reject) => {
        try {
          if (data.column && data.column.length > 0) {
            data.column.forEach((col) => {
              if (
                col.type === 'dynamic' &&
                col.children &&
                col.children.column &&
                col.children.column.length > 0
              ) {
                const c = col.children.column;
                c.forEach((item) => {
                  item.subfield = true;
                });
                this.transAvueOptionsToFormDesigner(col.children).then((res) => {
                  col.children = res;
                });
              } else if (['checkbox', 'radio', 'tree', 'cascader', 'select'].includes(col.type)) {
                if (!col.dicData && col.dicQuery && typeof col.dicQuery === 'object') {
                  const arr = [];
                  for (let key in col.dicQuery) {
                    arr.push({
                      key,
                      value: col.dicQuery[key],
                      $cellEdit: true
                    });
                  }
                  col.dicQuery = arr;
                }
                if (col.dicUrl) col.dicOption = 'remote';
                else col.dicOption = 'static';
                if (!col.dicData) col.dicData = [];
              } else if (['upload'].includes(col.type)) {
                if (col.headers && typeof col.headers === 'object') {
                  const arr = [];
                  for (let key in col.headers) {
                    arr.push({
                      key,
                      value: col.headers[key],
                      $cellEdit: true
                    });
                  }
                  col.headers = arr;
                }

                if (col.data && typeof col.data === 'object') {
                  const arr = [];
                  for (let key in col.data) {
                    arr.push({
                      key,
                      value: col.data[key],
                      $cellEdit: true
                    });
                  }
                  col.data = arr;
                }
              }
            });
          } else if (data.group && data.group.length > 0) {
            for (let i = 0; i < data.group.length; i++) {
              if (!data.column) data.column = [];
              const col = data.group[i];

              const group = {
                type: 'group',
                label: col.label,
                icon: col.icon,
                prop: col.prop
              };
              this.transAvueOptionsToFormDesigner(col).then((res) => {
                group.children = res;
                data.column.push(group);
              });
            }
            delete data.group;
          }
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
