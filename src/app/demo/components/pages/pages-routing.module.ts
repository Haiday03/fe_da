import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'home', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
        { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
        { path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule) },
        { path: 'borrowed-history', loadChildren: () => import('./borrowed-history/borrowed-history.module').then(m => m.BorrowedHistoryModule) },
        { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FAQModule) },
        { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'book-detail/:id', loadChildren: () => import('./book-detail/book-detail.module').then(m => m.BookDetailModule) },
        
    ])],
    exports: [RouterModule] 
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'home', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
        { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
        { path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule) },
        { path: 'borrowed-history', loadChildren: () => import('./borrowed-history/borrowed-history.module').then(m => m.BorrowedHistoryModule) },
        { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FAQModule) },
        { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'book-detail/:id', loadChildren: () => import('./book-detail/book-detail.module').then(m => m.BookDetailModule) },
        
    ])],
    exports: [RouterModule] 
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'home', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
        { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
        { path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule) },
        { path: 'borrowed-history', loadChildren: () => import('./borrowed-history/borrowed-history.module').then(m => m.BorrowedHistoryModule) },
        { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FAQModule) },
        { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'book-detail/:id', loadChildren: () => import('./book-detail/book-detail.module').then(m => m.BookDetailModule) },
        
    ])],
    exports: [RouterModule] 
})
export class PagesRoutingModule { }
