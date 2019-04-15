// 菜单选择
export const selectMenu = isAdmin => {
  const menuSourceByadmin = [{
    key: '/admin/dashboard/visitorAnalysis',
    type: 'bar-chart',
    name: '访客分析',
    child: null
  },{
    key: 'UserManagement',
    type: 'team',
    name: '用户管理',
    child: [{
      key: '/admin/users/adminManage',
      type: 'contacts',
      name: '管理员管理'
    },{
      key: '/admin/users/userManage',
      type: 'user',
      name: '用户管理'
    },{
      key: '/admin/users/roleManage',
      type: 'man',
      name: '角色管理'
    }]
  },{
    key: '/admin/article',
    type: 'profile',
    name: '文章管理',
    child: null
  },{
    key: '/admin/permission',
    type: 'warning',
    name: '权限管理',
    child: null
  },{
    key: '/admin/kind',
    type: 'database',
    name: '分类管理',
    child: null
  },{
    key: 'log',
    type: 'info-circle',
    name: '日志管理',
    child: [{
      key: '/admin/logger/userLog',
      type: 'team',
      name: '用户日志'
    },{
      key: '/admin/logger/opLogger',
      type: 'tool',
      name: '操作日志'
    }]
  },{
    key: 'Account',
    type: 'user',
    name: '个人中心',
    child: [{
      key: '/admin/account/center',
      type: 'user',
      name: '个人中心'
    },{
      key: '/admin/account/setting',
      type: 'setting',
      name: '个人设置'
    }]
  }];

  const menuSourceByUser = [{
    key: '/admin/dashboard/visitorAnalysis',
    type: 'bar-chart',
    name: '访客分析',
    child: null
  },{
    key: 'Account',
    type: 'user',
    name: '个人',
    child: [{
      key: '/admin/account/center',
      type: 'user',
      name: '个人中心'
    },{
      key: '/admin/account/setting',
      type: 'setting',
      name: '个人设置'
    },{
      key: '/admin/article',
      type: 'profile',
      name: '文章管理',
      child: null
    }]
  },{
    key: '/admin/kind',
    type: 'database',
    name: '分类管理',
    child: null
  }];
  if (isAdmin === 1) {
    return menuSourceByadmin;
  } else {
    return menuSourceByUser;
  }
};
