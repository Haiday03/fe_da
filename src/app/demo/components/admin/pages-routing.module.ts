import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'author', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
        { path: 'publisher', loadChildren: () => import('./publisher/publisher.module').then(m => m.PublisherModule) },
        { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
        { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
        { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
        { path: 'review', loadChildren: () => import('./review-book/review.module').then(m => m.ReviewModule) },
        { path: 'borrow-return', loadChildren: () => import('./borrow-return/borrow-return.module').then(m => m.BorrowReturnModule) },
        { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
    ])],
    exports: [RouterModule] 
})
export class PagesRoutingModule { }
