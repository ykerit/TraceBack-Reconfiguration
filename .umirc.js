// ref: https://umijs.org/config/
import transformRemoveConsole  from 'babel-plugin-transform-remove-console';

export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'TraceBack',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  routes: [
    // user
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', name: 'login', component: './User/Login' },
        { path: '/user/register', name: 'register', component: './User/Register' },
      ],
    },
    // admin
    {
      path: '/admin',
      component: '../layouts/BasicLayout',
      Routes: ['src/routes/Authorized'],
      routes: [
        // dashboard
        {path: '/admin', redirect: '/admin/dashboard/visitorAnalysis'},
        {
          path: '/admin/dashboard/visitorAnalysis',
          name: 'analysis',
          component: './Admin/Dashboard/VisitorAnalysis',
        },
        {
          path: '/admin/users/adminManage',
          name: 'adminMange',
          component: './Admin/User/AdminManage'
        },
        // role
        {
          path: '/admin/users/roleManage',
          name: 'roleMange',
          component: './Admin/User/RoleManage'
        },
        // user
        {
          path: '/admin/users/userManage',
          name: 'userMange',
          component: './Admin/User/UserManage'
        },
        // permission
        {
          path: '/admin/permission',
          name: 'permission',
          component: './Admin/Permission/index'
        },
        //Kind
        {
          path: '/admin/kind',
          name: 'kind',
          component: './Admin/Kind/index'
        },
        // article
        {
          path: '/admin/article',
          name: 'article',
          component: './Admin/Article/index'
        },
        {
          path: '/admin/logger/opLogger',
          name: 'opLogger',
          component: './Admin/Logger/OpLog'
        },
        // user_log
        {
          path: '/admin/logger/userLog',
          name: 'userLog',
          component: './Admin/Logger/UserLog'
        },
        // mde
        {
          path: '/admin/mdEditor',
          name: 'mdEditor',
          component: './Admin/MDEditor/index'
        },
        // userCenter
        {
          path: '/admin/account/center',
          name: 'center',
          component: './Admin/Account/Center/index'
        },
        // setting
        {
          path: '/admin/account/setting',
          name: 'setting',
          component: './Admin/Account/UserSetting/index'
        },
      ],
    },
    // before
    {
      path: '/',
      component: '../layouts/GeneralLayout',
      routes: [
        {path: '/', redirect: '/index'},
        // index
        {
          path: '/index',
          name: 'index',
          component: './Index/index'
        },
        // classification
        {
          path: '/classification',
          name: 'classification',
          component: './Classification/index'
        },
        // filed
        {
          path: '/filed',
          name: 'filed',
          component: './Filed/index'
        },
        // about
        {
          path: '/about',
          name: 'about',
          component: './About/index'
        },
        // tags
        {
          path: '/tags',
          name: 'tags',
          component: './Tags/index'
        },
        // articleDetail
        {
          path: '/article_detail/:id',
          name: 'article_detail',
          component: './ArticleDetail/$id'
        },
      ]
    }
  ],
  "extraBabelPlugins": [
    ["transform-remove-console"],
  ]
}
