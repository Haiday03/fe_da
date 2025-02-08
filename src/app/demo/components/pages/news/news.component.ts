import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Author } from 'src/app/demo/api/author/Author';
import { New } from 'src/app/demo/api/new/New';
import { AuthorService } from 'src/app/demo/service/author.service';
import { NewService } from 'src/app/demo/service/new.service';

@Component({
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    providers: [MessageService]
})
export class NewsComponent { 
    // begin search variables
    searchKeyword = "";
    searchReleaseDate = "";
    // end search variables

    visible: boolean = false;
    content: string = "";

    itemsMenu: MenuItem[];
    home: MenuItem;

    new: New = {
        id: 0,
        code: '',
        title: '',
        releaseDate: undefined,
        summary: '',
        content: '',
        keyword: '',
        authorId: 0
    };

    authors: Author[];

    listNew : New[] = [];
    listNewSelected : New[] = [];

    constructor(private newService: NewService, private authorService: AuthorService, private messageService: MessageService) { }

    ngOnInit(): void {

        this.itemsMenu = [
            {label: 'Danh mục'},
            {label: 'Tin tức'}
        ];

        this.home = {icon: 'pi pi-home'};

        this.getAllAuthor();

        this.newService.getAll().subscribe(
            res=>{
                this.listNew = res;
            }
        )

    }

    getAllAuthor(){
        this.authorService.getAll().subscribe(data => {
            this.authors = data;
        })
    }

    search(){
    }

    refreshSearchFields(){
        this.searchKeyword = '';
        this.searchReleaseDate = '';
    }

    displayContent(content){
        // alert("Hiển thị nội dung");
        this.visible = true;
        this.content = content;
    }

}
