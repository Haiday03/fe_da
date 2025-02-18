import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Role } from '../demo/api/user-detail/User';
import { AuthenticationService } from '../demo/components/security/authentication.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    adminModel: any[] = [];

    admin: boolean = false;
    lg: string = 'vi';

    constructor(
        public layoutService: LayoutService,
        private auth: AuthenticationService
    ) {}

    ngOnInit() {
        if (localStorage.getItem('lang')) {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        if (this.auth.hasRoleCode('LIBRARIAN')) {
            this.admin = true;
            this.adminModel = [
                {
                    label: this.lg === 'vi' ? 'Quản trị hệ thống' : 'System Administration',
                    icon: 'pi pi-fw pi-verified',
                    items: [
                        {
                            label: this.lg === 'vi' ? 'Báo cáo thống kê' : 'Statistical report',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/manage/dashboard'],
                        },
                        {
                            label: this.lg === 'vi' ? 'Quản lý thể loại' : 'Manage categories',
                            icon: 'pi pi-fw pi-th-large',
                            routerLink: ['/manage/category'],
                        },
                        {
                            label: this.lg === 'vi' ? 'Quản lý sách' : 'Book management',
                            icon: 'pi pi-fw pi-book',
                            routerLink: ['/manage/book'],
                        },
                        {
                            label: this.lg === 'vi' ? 'Quản lý tác giả' : 'Author management',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/manage/author'],
                        },
                        {
                            label: this.lg === 'vi' ? 'Quản lý nhà xuất bản' : 'Publisher Manager',
                            icon: 'pi pi-fw pi-share-alt',
                            routerLink: ['/manage/publisher'],
                        },
                        {
                            label: this.lg === 'vi' ? 'Quản lý bài viết' : 'Post management',
                            icon: 'pi pi-fw pi-key',
                            routerLink: ['/manage/news'],
                        },
                        {
                            label: this.lg === 'vi' ? 'Quản lý đánh giá' : 'Performance management',
                            icon: 'pi pi-fw pi-comments',
                            routerLink: ['/manage/review'],
                        },
                        {
                            label: this.lg === 'vi' ? 'Quản lý mượn trả' : 'Loan management',
                            icon: 'pi pi-fw pi-money-bill   ',
                            routerLink: ['/manage/borrow-return'],
                        },
                    ],
                },
            ];
        }

        if (this.auth.hasRoleCode('ADMIN')) {
            this.admin = true;
            this.adminModel = [
                {
                    label: 'Quản trị hệ thống',
                    icon: 'pi pi-fw pi-verified',
                    items: [
                        {
                            label: 'Báo cáo thống kê',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/manage/dashboard'],
                        },
                        {
                            label: 'Quản lý thể loại',
                            icon: 'pi pi-fw pi-th-large',
                            routerLink: ['/manage/category'],
                        },
                        {
                            label: 'Quản lý sách',
                            icon: 'pi pi-fw pi-book',
                            routerLink: ['/manage/book'],
                        },
                        {
                            label: 'Quản lý tác giả',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/manage/author'],
                        },
                        {
                            label: 'Quản lý nhà xuất bản',
                            icon: 'pi pi-fw pi-share-alt',
                            routerLink: ['/manage/publisher'],
                        },
                        {
                            label: 'Quản lý người dùng',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/manage/user'],
                        },
                        {
                            label: 'Quản lý bài viết',
                            icon: 'pi pi-fw pi-key',
                            routerLink: ['/manage/news'],
                        },
                        {
                            label: 'Quản lý đánh giá',
                            icon: 'pi pi-fw pi-comments',
                            routerLink: ['/manage/review'],
                        },
                        {
                            label: 'Quản lý mượn trả',
                            icon: 'pi pi-fw pi-money-bill   ',
                            routerLink: ['/manage/borrow-return'],
                        },
                    ],
                },
            ];
        }

        this.model = [
            {
                label: 'Danh mục',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Trang chủ',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/home'],
                    },
                    // {
                    //     label: 'Giới thiệu',
                    //     icon: 'pi pi-fw pi-info-circle',
                    //     routerLink: ['/pages/introduce']
                    // },
                    {
                        label: 'Tin tức',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/pages/news'],
                    },
                    {
                        label: 'Tra cứu sách',
                        icon: 'pi pi-fw pi-search',
                        routerLink: ['/pages/list'],
                    },
                    {
                        label: 'Sách yêu thích',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['/wish'],
                    },
                    {
                        label: 'Lịch sử mượn trả',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['/pages/borrowed-history'],
                    },
                    {
                        label: 'Câu hỏi thường gặp',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/pages/faq'],
                    },
                    // {
                    //     label: 'Giỏ hàng',
                    //     icon: 'pi pi-fw pi-shopping-cart',
                    //     routerLink: ['/cart']
                    // },
                    // {
                    //     label: 'Yêu thích',
                    //     icon: 'pi pi-fw pi-heart',
                    //     routerLink: ['/wish']
                    // },
                    // {
                    //     label: 'Subscription',
                    //     icon: 'pi pi-fw pi-dollar',
                    //     routerLink: ['/subscription']
                    // },
                ],
            },
            {
                label: 'Thông tin cá nhân',
                items: [
                    {
                        label: 'Cá nhân',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/profile'],
                    },
                    {
                        label: 'Cài đặt',
                        icon: 'pi pi-fw pi-bars',
                        items: [
                            {
                                label: 'Sửa thông tin',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/settings'],
                            },
                            {
                                label: 'Đổi mật khẩu',
                                icon: 'pi pi-fw pi-sync',
                                routerLink: ['/change-password'],
                            },
                        ],
                    },
                    // {
                    //     label: 'Authenticate',
                    //     icon: 'pi pi-fw pi-user',
                    //     items:
                    //         [
                    //             {
                    //                 label: 'Register',
                    //                 icon: 'pi pi-fw pi-user-plus',
                    //                 routerLink: ['/auth/register']
                    //             },
                    //             {
                    //                 label: 'Login',
                    //                 icon: 'pi pi-fw pi-sign-in',
                    //                 routerLink: ['/auth/login']
                    //             },
                    //             {
                    //                 label: 'Error',
                    //                 icon: 'pi pi-fw pi-times-circle',
                    //                 routerLink: ['/auth/error']
                    //             },
                    //             {
                    //                 label: 'Access Denied',
                    //                 icon: 'pi pi-fw pi-lock',
                    //                 routerLink: ['/auth/access']
                    //             }
                    //         ]
                    //     },
                ],
            },
        ];
    }
}
