import { Component, OnInit } from '@angular/core';
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
                    label:
                        this.lg === 'vi'
                            ? 'Quản trị hệ thống'
                            : 'System Administration',
                    icon: 'pi pi-fw pi-verified',
                    items: [
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Báo cáo thống kê'
                                    : 'Statistical report',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/manage/dashboard'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý thể loại'
                                    : 'Manage categories',
                            icon: 'pi pi-fw pi-th-large',
                            routerLink: ['/manage/category'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý sách'
                                    : 'Book management',
                            icon: 'pi pi-fw pi-book',
                            routerLink: ['/manage/book'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý tác giả'
                                    : 'Author management',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/manage/author'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý nhà xuất bản'
                                    : 'Publisher Manager',
                            icon: 'pi pi-fw pi-share-alt',
                            routerLink: ['/manage/publisher'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý bài viết'
                                    : 'Post management',
                            icon: 'pi pi-fw pi-key',
                            routerLink: ['/manage/news'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý đánh giá'
                                    : 'Performance management',
                            icon: 'pi pi-fw pi-comments',
                            routerLink: ['/manage/review'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý mượn trả'
                                    : 'Loan management',
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
                    label:
                        this.lg === 'vi'
                            ? 'Quản trị hệ thống'
                            : 'System Administration',
                    icon: 'pi pi-fw pi-verified',
                    items: [
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Báo cáo thống kê'
                                    : 'Statistical report',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/manage/dashboard'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý thể loại'
                                    : 'Manage categories',
                            icon: 'pi pi-fw pi-th-large',
                            routerLink: ['/manage/category'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý sách'
                                    : 'Book management',
                            icon: 'pi pi-fw pi-book',
                            routerLink: ['/manage/book'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý tác giả'
                                    : 'Author management',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/manage/author'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý nhà xuất bản'
                                    : 'Publisher Manager',
                            icon: 'pi pi-fw pi-share-alt',
                            routerLink: ['/manage/publisher'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý bài viết'
                                    : 'Post management',
                            icon: 'pi pi-fw pi-key',
                            routerLink: ['/manage/news'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý đánh giá'
                                    : 'Performance management',
                            icon: 'pi pi-fw pi-comments',
                            routerLink: ['/manage/review'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý mượn trả'
                                    : 'Loan management',
                            icon: 'pi pi-fw pi-money-bill   ',
                            routerLink: ['/manage/borrow-return'],
                        },
                        {
                            label:
                                this.lg === 'vi'
                                    ? 'Quản lý người dùng'
                                    : 'User management',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/manage/user'],
                        },
                    ],
                },
            ];
        }

        this.model = [
            {
                label: this.lg === 'vi' ? 'Danh mục' : 'Category',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: this.lg === 'vi' ? 'Trang chủ' : 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/pages/home'],
                    },
                    {
                        label: this.lg === 'vi' ? 'Tin tức' : 'News',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/pages/news'],
                    },
                    {
                        label:
                            this.lg === 'vi' ? 'Tra cứu sách' : 'Book lookup',
                        icon: 'pi pi-fw pi-search',
                        routerLink: ['/pages/list'],
                    },
                    {
                        label:
                            this.lg === 'vi'
                                ? 'Sách yêu thích'
                                : 'Favorite books',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['/wish'],
                    },
                    {
                        label:
                            this.lg === 'vi'
                                ? 'Lịch sử mượn trả'
                                : 'Borrowing History',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['/pages/borrowed-history'],
                    },
                    {
                        label:
                            this.lg === 'vi'
                                ? 'Câu hỏi thường gặp'
                                : 'Frequently Asked Questions',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/pages/faq'],
                    },
                ],
            },
            {
                label:
                    this.lg === 'vi'
                        ? 'Thông tin cá nhân'
                        : 'Personal Information',
                items: [
                    {
                        label: this.lg === 'vi' ? 'Cá nhân' : 'Personal',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/profile'],
                    },
                    {
                        label: this.lg === 'vi' ? 'Cài đặt' : 'Settings',
                        icon: 'pi pi-fw pi-bars',
                        items: [
                            {
                                label:
                                    this.lg === 'vi'
                                        ? 'Sửa thông tin'
                                        : 'Edit information',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/settings'],
                            },
                            {
                                label:
                                    this.lg === 'vi'
                                        ? 'Đổi mật khẩu'
                                        : 'Change password',
                                icon: 'pi pi-fw pi-sync',
                                routerLink: ['/change-password'],
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
