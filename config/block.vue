<template>
  <div>
    <el-form-item label="图标">
      <avue-icon-select
        v-model="data.icon"
        :icon-list="iconList"
        placeholder="图标"
      ></avue-icon-select>
    </el-form-item>
    <el-form-item label="图标">
      <avue-form :option="option" v-model="data.blockData"></avue-form>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'config-block',
  props: ['data'],
  watch: {
    'data.blockData.version': function(val) {
      if (!this.versionlist && !this.versionlist.length) return;
      this.versionlist.map((item) => {
        if (item.version === val) {
          this.data.item = item;
          this.data.prop = item.slug;
        }
      });
    }
  },
  data() {
    return {
      iconList: [
        {
          label: 'element-ui',
          list: [
            'el-icon-info',
            'el-icon-error',
            'el-icon-success',
            'el-icon-warning',
            'el-icon-question'
          ]
        }
      ],
      option: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: '业务模块',
            prop: 'buisnessUnit',
            cascaderItem: ['block', 'version'],
            type: 'select',
            span: 24,
            dicUrl: '/layout/dics/value/businssUnit',
            dicMethod: 'get',
            rules: [
              {
                required: true,
                message: '请选择模块',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '业务组件',
            prop: 'block',
            props: {
              label: 'name',
              value: 'code'
            },
            type: 'select',
            dicFlag: false,
            span: 24,
            dicUrl: `/layout/blocks?businessUnit={{key}}`,
            dicFormatter: (res) => {
              // 查找已发布组件 （版本号大于 0）
              let list = res.filter((item) => {
                return item.version > 0;
              });
              return list;
            },
            rules: [
              {
                required: true,
                message: '请选择组件',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '组件版本',
            prop: 'version',
            span: 24,
            type: 'select',
            dicFlag: false,
            props: {
              label: 'version',
              value: 'version'
            },
            dicFormatter: (res) => {
              let list = [];
              for (let i in res) {
                // arr.push(obj[i]); //属性
                list.push(res[i]); // 值
              }
              this.versionlist = list;
              return list;
            },
            dicUrl: '/layout/block-versions/versions/{{key}}',
            rules: [
              {
                required: true,
                message: '请选择版本',
                trigger: 'blur'
              }
            ]
          }
        ]
      },
      blockOptionData: {},
      versionlist: []
    };
  }
};
</script>
<style lang="scss" scoped></style>
