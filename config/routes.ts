export default [
	{
	  path: '/user',
	  layout: false,
	  routes: [
		{
		  path: '/user/login',
		  layout: false,
		  name: 'login',
		  component: './user/Login',
		},
		{
		  path: '/user',
		  redirect: '/user/login',
		},
	  ],
	},
	{
	  path: '/dashboard',
	  name: 'Dashboard',
	  component: './TrangChu',
	  icon: 'HomeOutlined',
	},
	{
	  path: '/gioi-thieu',
	  name: 'About',
	  component: './TienIch/GioiThieu',
	  hideInMenu: true,
	},
	{
	  path: '/random-user',
	  name: 'RandomUser',
	  component: './RandomUser',
	  icon: 'ArrowsAltOutlined',
	},
	{
	  path: '/todo-list',
	  name: 'TodoList',
	  icon: 'OrderedListOutlined',
	  component: './TodoList',
	},
	{
	  path: '/auto-message',
	  name: 'AutoMessage',
	  icon: 'MessageOutlined',
	  component: './AutoMessage',
	},
	{
	  path: '/phong-hoc',
	  name: 'Phòng học',
	  icon: 'BankOutlined',
	  component: './PhongHoc',
	},
	{
	  path: '/khoa-hoc',
	  name: 'Quản lý khóa học',
	  icon: 'BookOutlined',
	  component: './KhoaHoc',
	},
	{
	  path: '/notification',
	  routes: [
		{
		  path: './subscribe',
		  exact: true,
		  component: './ThongBao/Subscribe',
		},
		{
		  path: './check',
		  exact: true,
		  component: './ThongBao/Check',
		},
		{
		  path: './',
		  exact: true,
		  component: './ThongBao/NotifOneSignal',
		},
	  ],
	  layout: false,
	  hideInMenu: true,
	},
	{
	  path: '/',
	},
	{
	  path: '/403',
	  component: './exception/403/403Page',
	  layout: false,
	},
	{
	  path: '/hold-on',
	  component: './exception/DangCapNhat',
	  layout: false,
	},
	{
	  component: './exception/404',
	},
  ];
