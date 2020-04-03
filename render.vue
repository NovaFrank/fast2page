<template>
  <div class="page-render">
    <Fast2Render :option="option"></Fast2Render>
  </div>
</template>

<script>
// import widgetEmpty from './assets/widget-empty.png';
import Fast2Render from './components/render/widget/fast2render';
export default {
  name: 'PageDesign',
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          column: []
        };
      }
    }
  },
  // components: { MohoRender, widgetEmpty },
  components: { Fast2Render },
  methods: {
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
.page-render {
  padding: 10px;
}
</style>
