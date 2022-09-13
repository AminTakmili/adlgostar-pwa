export const globalData = {
	personType: [
		{ id: 'real', name: 'حقیقی' },
		{ id: 'legal', name: 'حقوقی' },
	],
	conditionType: [
		{ id: 'public', name: 'عمومی' },
		{ id: 'private', name: 'خصوصی' },
	],
	gender: [
		{ id: 'male', name: 'آقا' },
		{ id: 'female', name: 'خانم' },
	],
	menu: [
		{
			name: 'داشبورد',
			url: '/',
			icon: 'speedometer',
			open: false,
			state: 'close',
			function: 'showDetail',
			access: true,
		},
		{
			name: 'کاربران',
			icon: 'people-circle',
			open: false,
			state: 'close',
			function: 'showDetail',
			submenu: [
				{
					name: 'انواع کاربران',
					url: '/users/type',
					icon: 'color-palette',
					function: 'showDetail',
				},
				{
					name: 'نقش ها',
					url: '/users/role',
					icon: 'construct',
					function: 'showDetail',
				},
				{
					name: 'کاربران',
					url: '/users/list',
					icon: 'person-add',
					function: 'showDetail',
				},
			],
		},
		{
			name: 'کسب و کار ها',
			url: '/businesses',
			icon: 'business',

			open: false,
			state: 'close',
			function: 'showDetail',
		},
		{
			name: 'کارفرمایان',
			url: '/employers',
			icon: 'person-circle',

			open: false,
			state: 'close',
			function: 'showDetail',
		},
		{
			name: 'کارمندان',
			url: '/employees',
			icon: 'people',

			open: false,
			state: 'close',
			function: 'showDetail',
		},
	
		{
			name: 'قرارداد ها',
			icon: 'document',
			open: false,
			state: 'close',
			function: 'showDetail',
			submenu: [
				{
					name: 'لیست قرار داد ها',
					url: '/contracts/list',
					icon: 'document',
					function: 'showDetail',
				},
				{
					name: 'قالب قرارداد',
					url: '/contracts/template',
					icon: 'document-attach',
					function: 'showDetail',
				},
				{
					name: 'قالب سربرگ قرارداد',
					url: '/contracts/header/template/list',
					// icon: 'document-attach',
					src: '/assets/svg/headerIcon.svg',
					function: 'showDetail',
				},
				{
					name: 'قالب پاورقی قرارداد',
					url: '/contracts/footer/template/list',
					// icon: 'document-attach',
					src: '/assets/svg/footerIcon.svg',
					function: 'showDetail',
				},
				{
					name: 'شروط ضمن قرار داد',
					url: '/contracts/conditions',
					icon: 'document-lock',
					function: 'showDetail',
				},
			],
		},
		{
			name: 'حقوق و دستمزد',
			icon: 'document-text',
			open: false,
			state: 'close',
			function: 'showDetail',
			access: true,
			submenu: [
				{
					name: 'اطلاعات پایه حقوق و دستمزد',
					// url: '/payrolls/payroll_base_info',
					icon: 'document-text',
					function: 'showDetail',
				
					open: false,
					state: 'close',
					childeren: [
						{
							name: ' ساعت های موظفی',
							url: '/payrolls/payroll_base_info/working_hour/list',
							icon: 'ellipse',
							function: 'showDetail',
						
						},
						{
							name: ' مالیات حقوق',
							url: '/payrolls/payroll_base_info/payroll_tax/list',
							icon: 'ellipse',
							function: 'showDetail',
						
						},
						{
							name: ' اضافات حقوق و دستمزد ',
							url: '/payrolls/payroll_base_info/payroll_addition/list',
							icon: 'ellipse',
							function: 'showDetail',
						
						},
						{
							name: 'کسورات حقوق و دستمزد ',
							url: '/payrolls/payroll_base_info/payroll_deduction/list',
							icon: 'ellipse',
							function: 'showDetail',
						
						},
						{
							name: 'قالب های تسویه حساب ',
							url: '/payrolls/payroll_base_info/settlement/template/list',
							icon: 'ellipse',
							function: 'showDetail',
						
						},
						{
							name: ' اضافات تسویه حساب ',
							url: "/payrolls/payroll_base_info/settlement/addition/list",
							icon: 'ellipse',
							function: 'showDetail',
						
						},
						{
							name: ' کسورات تسویه حساب ',
							url: "/payrolls/payroll_base_info/settlement/deduction/list",
							icon: 'ellipse',
							function: 'showDetail',
						
						},
					],
				},
				{
					name: 'فیش حقوقی',
					url: '/payrolls/payroll/list',
					icon: 'list',
					function: 'showDetail',
					access: true,
				},
				{
					name: 'تسویه حساب',
					url: 'payrolls/settlement/list',
					src: '/assets/svg/settlementIcon.svg',
					function: 'showDetail',
					access: true,
				},
			],
		},
		// {
		// 	name: ' تسویه حساب',
		// 	icon: 'document-text',
		// 	open: false,
		// 	state: 'close',
		// 	function: 'showDetail',
		// 	access: true,
		// 	submenu: [
		// 		{
		// 			name: 'اطلاعات پایه  تسویه حساب ',
		// 			// url: '/payrolls/payroll_base_info',
		// 			icon: 'document-text',
		// 			function: 'showDetail',
				
		// 			open: false,
		// 			state: 'close',
		// 			childeren: [
					
		// 				{
		// 					name: 'قالب های تسویه حساب ',
		// 					url: '/payrolls/payroll_base_info/settlement/template/list',
		// 					icon: 'ellipse',
		// 					function: 'showDetail',
						
		// 				},
		// 				{
		// 					name: ' اضافات تسویه حساب ',
		// 					url: "/payrolls/payroll_base_info/settlement/addition/list",
		// 					icon: 'ellipse',
		// 					function: 'showDetail',
						
		// 				},
		// 				{
		// 					name: ' کسورات تسویه حساب ',
		// 					url: "/payrolls/payroll_base_info/settlement/deduction/list",
		// 					icon: 'ellipse',
		// 					function: 'showDetail',
						
		// 				},
		// 			],
		// 		},
		// 		{
		// 			name: 'تسویه حساب',
		// 			url: '/settlement/list',
		// 			icon: 'list',
		// 			function: 'showDetail',
		// 			access: true,
		// 		},
		// 	],
		// },
		{
			name: ' گزارشات',
			icon: 'receipt',
			open: false,
			state: 'close',
			function: 'showDetail',
			access: true,
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
					name: 'مرخصی باقی مانده',
					url: '/report/payroll/remainingLeave',
					icon: 'calendar',
					function: 'showDetail',
					
				},
				{
					name: 'دستمزد ماهیانه',
					url: '/report/payroll/monthlyWage',
					icon: 'card',
					function: 'showDetail',
					
				},
				{
					name: 'پایه سنوات',
					icon: 'file-tray-full',
					url: '/report/payroll/severancePayList',
					function: 'showDetail',
				},
			],
		},

		{
			name: 'بیشتر',
			icon: 'ellipsis-vertical',
			open: false,
			state: 'close',
			function: 'showDetail',
			submenu: [
				{
					name: 'پایه سنوات',
					url: '/more/basic-years',
					icon: 'trending-up',
					function: 'showDetail',
				},
				{
					name: 'حداقل مزد روزانه',
					url: '/more/minimum-daily-wage',
					icon: 'golf',
					function: 'showDetail',
				},
				{
					name: 'محاسبه پایه سنوات',
					url: '/more/calc-basic-years',
					icon: 'options',
					function: 'showDetail',
				},
				{
					name: 'موارد اضافه حقوق',
					url: '/more/extra-salary-item',
					icon: 'options',
					function: 'showDetail',
				},
				{
					name: 'ثابت های حقوق',
					url: '/more/salary-constants',
					icon: 'layers',
					function: 'showDetail',
				},
				{
					name: 'دسته بندی کسب کار',
					url: '/more/business-category',
					icon: 'git-network',
					function: 'showDetail',
				},
				{
					name: 'سمت های کارمندان',
					url: '/more/employee-posts',
					icon: 'git-compare',
					function: 'showDetail',
				},
				{
					name: 'بانک ها',
					url: '/more/bank',
					icon: 'cash',
					function: 'showDetail',
				},
			],
		},
		{
			name: 'تنظیمات ',
			icon: 'settings',
			open: false,
			state: 'close',
			function: 'showDetail',
			access: true,
			submenu: [
			
				{
					name: 'بخش تنظیم قرارداد',
					url: '/setting/contract_definition_section',
					icon: 'reader',
					function: 'showDetail',
				},
				
			],
		},
		{
			name: 'پروفایل من',
			icon: 'person-circle',
			open: false,
			state: 'close',
			function: 'showDetail',
			access: true,
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
					access: true,
				},
				{
					name: 'خروج از حساب کاربری',
					access: true,
					icon: 'log-out-outline',
					function: 'logout',
				},
			],
		},
		
	
	],
};
