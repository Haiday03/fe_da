import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardInfo } from '../../../api/dashboard/dashboardInfo';
import { StripeService } from '../../../service/stripe/stripe.service';
import { CategoryService } from 'src/app/demo/service/category.service';
import { Category } from 'src/app/demo/api/category/Category';
import { BorrowService } from 'src/app/demo/service/borrow.service';
import { ChartInfo } from 'src/app/demo/api/dashboard/chartInfo';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    dashboardInfo = new DashboardInfo();

    basicData: any;

    basicOptions: any;

    listCategory: Category[] = [];
    labelsTop5Category: string[] = [];
    datasTop5Category: number[] = [];
    lg: string = 'vi';

    chartInfor = new ChartInfo();

    constructor(
        private stripeService: StripeService,
        public layoutService: LayoutService,
        private categoryService: CategoryService,
        private borrowService: BorrowService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'vi');
        } else {
            this.lg = localStorage.getItem('lang') || 'vi';
        }
        this.categoryService.getTop5().subscribe((data) => {
            this.listCategory = data;
            // console.log(`size: ${this.listCategory.length}`)
            this.listCategory.forEach((category) => {
                this.labelsTop5Category.push(category.name);
                this.datasTop5Category.push(category.numberOfLoans);
            });

            this.basicData = {
                labels: this.labelsTop5Category,
                datasets: [
                    {
                        label: 'Thể loại',
                        data: this.datasTop5Category,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
        });

        this.borrowService.getDashboardData().subscribe((data) => {
            this.chartInfor = data;
            this.initChart();
        });

        this.stripeService.getOrders().subscribe((data) => {
            this.dashboardInfo = data;
        });

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: this.chartInfor.labels,
            datasets: [
                {
                    label: 'Đặt mượn',
                    data: this.chartInfor.borrowedDatas,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Đánh giá',
                    data: this.chartInfor.reviewedDatas,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }
}
