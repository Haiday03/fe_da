import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { Observable, map } from 'rxjs';
import { PaginationDto } from '../api/pagination/pagination';
import { SearchNewDto } from '../api/searchDto/search_new_dto';

@Injectable({
    providedIn: 'root',
})
export class NewService {
    NEW_PATH = '/new';

    constructor(private apiService: ApiService) {}

    getAll(): Observable<any> {
        return this.apiService.getAll(this.NEW_PATH).pipe(
            map((res) => {
                if (res) return res;
                else return {};
            })
        );
    }

    getPage(pagination: PaginationDto, searchNewDto: SearchNewDto) {
        var conditionStr = this.getConditionString(searchNewDto);
        return this.apiService
            .getAll(
                `${this.NEW_PATH}/get/page?page=${pagination.page}&size=${pagination.size}${conditionStr}`
            )
            .pipe(
                map((res) => {
                    if (res) {
                        return res;
                    } else {
                        return {};
                    }
                })
            );
    }

    getList(pagination: PaginationDto, searchAuthorDto: SearchNewDto) {
        const dataBody = {
            page: pagination.page,
            limit: pagination.size,
            title: searchAuthorDto.keyword,
            authorId: searchAuthorDto.authorId,
            fromDate: searchAuthorDto.fromDate.toLocaleString(),
            toDate: searchAuthorDto.toDate.toLocaleString(),
        };
        return this.apiService
            .postBody(this.NEW_PATH + '/search', dataBody)
            .pipe(
                map((res) => {
                    if (res) {
                        return res;
                    } else {
                        return {};
                    }
                })
            );
    }

    getConditionString(searchNewDto: SearchNewDto) {
        var conditionStr = '';
        if (
            typeof searchNewDto.keyword != 'undefined' &&
            searchNewDto.keyword
        ) {
            conditionStr += `title~'*${searchNewDto.keyword}*'`;
        }
        if (
            typeof searchNewDto.authorId != 'undefined' &&
            searchNewDto.authorId
        ) {
            if (conditionStr) {
                conditionStr += ` and authorId:${searchNewDto.authorId}`;
            } else {
                conditionStr += `authorId:${searchNewDto.authorId}`;
            }
        }
        if (
            typeof searchNewDto.fromDate != 'undefined' &&
            searchNewDto.fromDate
        ) {
            console.log('dong 1');

            if (conditionStr) {
                conditionStr += ` and releaseDate>:'${searchNewDto.fromDate.toLocaleString()}`;
            } else {
                conditionStr += `releaseDate>:'${searchNewDto.fromDate.toLocaleString()}'`;
            }
            console.log('dong 2');
        }
        if (typeof searchNewDto.toDate != 'undefined' && searchNewDto.toDate) {
            console.log('dong 3');

            if (conditionStr) {
                conditionStr += ` and releaseDate<:'${searchNewDto.toDate.toLocaleString()} 23:59:59'`;
            } else {
                conditionStr += `releaseDate<:'${searchNewDto.toDate.toLocaleString()} 23:59:59'`;
            }
            console.log('dong 4');
        }

        if (conditionStr) {
            conditionStr = '&filter=' + conditionStr;
        }

        console.log('ao that day');
        
        return conditionStr;
    }

    post(category): Observable<any> {
        return this.apiService.post(this.NEW_PATH, category).pipe(
            map((res) => {
                if (res) return res;
                else return {};
            })
        );
    }

    getOne(id): Observable<any> {
        return this.apiService.getById(this.NEW_PATH + '/' + id).pipe(
            map((res) => {
                if (res) return res;
                else return {};
            })
        );
    }

    put(id, category): Observable<any> {
        return this.apiService.put(this.NEW_PATH + '/' + id, category).pipe(
            map((res) => {
                if (res) return res;
                else return {};
            })
        );
    }

    deleteOne(id): Observable<any> {
        return this.apiService.delete(this.NEW_PATH + '/' + id).pipe(
            map((res) => {
                if (res) return res;
                else return {};
            })
        );
    }

    deleteList(list): Observable<any> {
        return this.apiService.deleteList(this.NEW_PATH, list);
    }
}
