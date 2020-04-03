export default [
  {
    title: '布局模块',
    list: [
      {
        type: 'group',
        label: '模块',
        icon: 'icon-group',
        display: true,
        children: {
          column: []
        }
      },
      {
        type: 'dynamic',
        label: '动态',
        icon: 'icon-table',
        span: 24,
        display: true,
        children: {
          align: 'center',
          headerAlign: 'center',
          column: []
        }
      },
      {
        type: 'button-group',
        label: '按钮组',
        icon: 'icon-table',
        span: 24,
        display: true,
        children: {
          align: 'center',
          headerAlign: 'center',
          column: []
        }
      },
      {
        type: 'tab',
        label: 'Tab',
        icon: 'icon-table',
        span: 24,
        display: true,
        children: {
          align: 'center',
          headerAlign: 'center',
          column: [
            {
              prop: 'tab1',
              label: '标签一',
              children: {
                prop: 'tab1-content',
                column: [
                  {
                    type: 'normal',
                    label: '单行文本',
                    labelPosition: 'left',
                    icon: 'icon-input',
                    span: 24,
                    display: true
                  }
                ]
              }
            },
            {
              prop: 'tab2',
              label: '标签二',
              children: {
                prop: 'tab2-content',
                column: [
                  {
                    type: 'normal',
                    label: '单行文本',
                    labelPosition: 'left',
                    icon: 'icon-input',
                    span: 24,
                    display: true
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  },
  {
    title: '动态展示组件',
    list: [
      {
        type: 'block',
        label: '业务组件',
        labelPosition: 'left',
        icon: 'icon-input',
        prop: '',
        span: 24,
        display: true
      },
      {
        type: 'normal',
        label: '单行文本',
        labelPosition: 'left',
        icon: 'icon-input',
        prop: '',
        span: 24,
        display: true
      },
      {
        type: 'textarea',
        label: '多行文本',
        labelPosition: 'left',
        icon: 'icon-textarea',
        span: 24,
        prop: '',
        display: true
      },
      {
        type: 'array',
        label: '数组',
        icon: 'icon-array',
        span: 24,
        prop: '',
        display: true
      },
      {
        type: 'img',
        label: '图片',
        icon: 'icon-img',
        labelPosition: 'left',
        span: 24,
        prop: '',
        display: true
      },
      {
        type: 'url',
        label: '链接',
        labelPosition: 'left',
        icon: 'icon-url',
        prop: '',
        url: '#',
        span: 24,
        display: true
      },
      {
        type: 'multi-line',
        label: '段落',
        labelPosition: 'top',
        icon: 'icon-img',
        prop: '',
        span: 24,
        display: true
      }
    ]
  },
  {
    title: '静态展示组件',
    list: [
      {
        type: 'html',
        label: '静态内容',
        labelPosition: 'left',
        icon: 'icon-input',
        prop: '',
        span: 24,
        display: true
      },
      {
        type: 'header',
        label: '标题',
        labelPosition: 'left',
        icon: 'icon-textarea',
        span: 24,
        prop: '',
        display: true
      },
      {
        type: 'divider',
        label: '分割线',
        icon: 'icon-array',
        span: 24,
        prop: '',
        display: true
      },
      {
        type: 'img',
        label: '图片',
        icon: 'icon-img',
        labelPosition: 'left',
        span: 24,
        prop: '',
        display: true
      },
      {
        type: 'button',
        label: '按钮',
        icon: 'icon-url',
        prop: '',
        action: '',
        actionText: '',
        span: 24,
        display: true
      }
    ]
  }
];
