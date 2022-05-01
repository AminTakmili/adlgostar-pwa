export const globalData = {
	"personType" : [
		{ id : 'real' , name : 'حقیقی' } ,
		{ id : 'legal' , name : 'حقوقی' }
	],
	"conditionType" : [
		{ id : 'public' , name : 'عمومی' } ,
		{ id : 'private' , name : 'خصوصی' }
	],
	"gender" : [
		{ id : 'male' , name : 'آقا' } ,
		{ id : 'female' , name : 'خانم' }
	],
	"menu" : [
		{
			name: 'داشبورد',
			url: '/',
			icon: 'speedometer',
			open: false,
			state: "close",
			function: 'showDetail',
			access : true,
		},
		{
			name: 'کاربران',
			icon: 'people-circle',
			open: false,
			state: "close",
			function: 'showDetail',
			submenu: [
				{
					name: 'انواع کاربران',
					url: '/users/type',
					icon: 'color-palette',
					function: 'showDetail'

				},
				{
					name: 'نقش ها',
					url: '/users/role',
					icon: 'construct',
					function: 'showDetail'
				},
				{
					name: 'کاربران',
					url: '/users/list',
					icon: 'person-add',
					function: 'showDetail'
				},
			],

		},
		{
			name: 'کسب و کار ها',
			url: '/businesses',
			icon: 'business',

			open: false,
			state: "close",
			function: 'showDetail'
		},
		{
			name: 'کارفرمایان',
			url: '/employers',
			icon: 'person-circle',

			open: false,
			state: "close",
			function: 'showDetail'
		},
		{
			name: 'کارمندان',
			url: '/employees',
			icon: 'people',

			open: false,
			state: "close",
			function: 'showDetail'
		},
		{
			name: 'قرارداد ها',
			icon: 'document-text',
			open: false,
			state: "close",
			function: 'showDetail',
			submenu: [
				{
					name: 'لیست قرار داد ها',
					url: '/contracts/list',
					icon: 'document-text',
					function: 'showDetail'
				},
				{
					name: 'قالب قرارداد',
					url: '/contracts/template',
					icon: 'document-attach',
					function: 'showDetail'

				},
				{
					name: 'شروط ضمن قرار داد',
					url: '/contracts/conditions',
					icon: 'document-lock',
					function: 'showDetail'

				},
			]
		},
		{
			name: 'بیشتر',
			icon: 'ellipsis-vertical',
			open: false,
			state: "close",
			function: 'showDetail',
			submenu: [
				{
					name: 'پایه سنوات',
					url: '/more/basic-years',
					icon: 'trending-up',
					function: 'showDetail'

				},
				{
					name: 'حداقل مزد روزانه',
					url: '/more/minimum-daily-wage',
					icon: 'golf',
					function: 'showDetail'

				},
				{
					name: 'محاسبه پایه سنوات',
					url: '/more/calc-basic-years',
					icon: 'options',
					function: 'showDetail'

				},
				{
					name: 'موارد اضافه حقوق',
					url: '/more/extra-salary-item',
					icon: 'options',
					function: 'showDetail'

				},
				{
					name: 'ثابت های حقوق',
					url: '/more/salary-constants',
					icon: 'layers',
					function: 'showDetail'

				},
				{
					name: 'دسته بندی کسب کار',
					url: '/more/business-category',
					icon: 'git-network',
					function: 'showDetail'

				},
				{
					name: 'سمت های کارمندان',
					url: '/more/employee-posts',
					icon: 'git-compare',
					function: 'showDetail'

				},
				{
					name: 'بانک ها',
					url: '/more/bank',
					icon: 'cash',
					function: 'showDetail'

				},
			],
		},
		{
			name: 'پروفایل من',
			icon: 'person-circle',
			open: false,
			state: "close",
			function: 'showDetail',
			access : true,
			submenu: [
				// {
				// 	name: 'ویرایش اطلاعات',
				// 	url: '/business',
				// 	icon: 'create',
				// 	function: 'showDetail'

				// },
				// {
				// 	name: 'اطلاعات تماس',
				// 	url: '/business',
				// 	icon: 'call',
				// 	function: 'showDetail'
				// },
				{
					name: 'پشتیبانی',
					url: '/profile/support',
					icon: 'chatbubbles',
					function: 'showDetail',
				},
				{
					name: 'تغییر شماره همراه',
					url: '/profile/change-number',
					icon: 'id-card',
					function: 'showDetail',
					access : true,
				},
				{
					name: 'خروج از حساب کاربری',
					access : true,
					icon: 'log-out-outline',
					function: 'logout'

				},
			],

		}
	]
}
