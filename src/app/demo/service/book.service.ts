import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './general/api.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginationDto } from '../api/pagination/pagination';
import { SearchBookDto } from '../api/searchDto/search_book_dto';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    BOOK_PATH = '/book';
    FIND_BY_NAME = '/find';
    INVENTORY_STATUS = '/inventoryStatus';
    FILTER = '/filter';
    RECENT_SALES = '/recentSales';
    RECOMMENDED = '/recommended';
    UPLOAD_IMAGE = '/book/upload/image';
    SEARCH = '/search';

    constructor(private apiService: ApiService, private http: HttpClient) {}

    getAll(myparams = {}): Observable<any> {
        console.log(myparams);
        return this.apiService
            .getAllWithParams(this.BOOK_PATH, myparams ? myparams : {})
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
    getTopBooks(): Observable<any> {
        return this.apiService.getTopBooks(this.BOOK_PATH + this.FILTER).pipe(
            map((res) => {
                if (res) {
                    return res;
                } else {
                    return {};
                }
            })
        );
    }
    getSlope(): Observable<any> {
        return this.apiService.getSlope(this.BOOK_PATH + '/slope').pipe(
            map((res) => {
                if (res) {
                    return res;
                } else {
                    return {};
                }
            })
        );
    }
    getRec(id: string): Observable<any> {
        return this.apiService
            .getSlope(this.BOOK_PATH + '/' + id + this.RECOMMENDED)
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
    getById(id: string): Observable<any> {
        return this.apiService.getById(this.BOOK_PATH + '/' + id).pipe(
            map((res) => {
                if (res) {
                    return res;
                } else {
                    return {};
                }
            })
        );
    }
    findAllByName(name: string): Observable<any> {
        return this.apiService
            .findAllByName(this.BOOK_PATH + this.FIND_BY_NAME + '/' + name)
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
    inventoryStatus(quantity: number): Observable<any> {
        return this.apiService
            .inventoryStatus(
                this.BOOK_PATH + this.INVENTORY_STATUS + '/' + quantity
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
    getRecentSales() {
        return this.apiService
            .getRecentSales(this.BOOK_PATH + this.RECENT_SALES)
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
    post(params): Observable<any> {
        return this.apiService.post(this.BOOK_PATH, params).pipe(
            map((res) => {
                if (res) {
                    return res;
                } else {
                    return {};
                }
            })
        );
    }
    uploadImage(formData): Observable<any> {
        return this.apiService.post(this.UPLOAD_IMAGE, formData).pipe(
            map(
                // res => {
                //   if (res) {
                //     return res;
                //   } else {
                //     return {};
                //   }
                // }
                (res) => {
                    console.log('Trạng thái: ' + res.status);
                    console.log('Thông báo: ' + res.body);
                }
            )
        );
    }

    // Returns an observable
    upload(file: File): Observable<any> {
        // Create form data
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append('file', file);

        const headers = new HttpHeaders().set('Expect', '');
        const options = { headers: headers, observe: 'response' };

        // Make http post request over api
        // with formData as req
        return this.http.post(
            'http://localhost:9091/api/book/upload/image',
            formData,
            { observe: 'response', responseType: 'text' }
        );
    }

    put(id: number, book): Observable<any> {
        return this.apiService.put(this.BOOK_PATH + '/' + id, book).pipe(
            map((res) => {
                if (res) {
                    return res;
                } else {
                    return {};
                }
            })
        );
    }
    delete(id): Observable<any> {
        return this.apiService.delete(this.BOOK_PATH + '/' + id).pipe(
            map((res) => {
                if (res) {
                    return res;
                } else {
                    return {};
                }
            })
        );
    }

    deleteList(listBook): Observable<any> {
        return this.apiService.deleteList(this.BOOK_PATH, listBook);
    }

    getPage(pagination: PaginationDto, searchBookDto: SearchBookDto) {
        var conditionStr = this.getConditionString(searchBookDto);
        return this.apiService
            .getAll(
                `${this.BOOK_PATH}/get/page?page=${pagination.page}&size=${pagination.size}${conditionStr}`
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

    getList(pagination: PaginationDto, searchBookDto: SearchBookDto) {
        const dataBody = {
            page: pagination.page,
            limit: pagination.size,
            code: searchBookDto.code,
            name: searchBookDto.name,
            categoryId: searchBookDto.categoryId,
            publisherId: searchBookDto.publisherId,
            publishingYear: searchBookDto.publishingYear
        };
        return this.apiService.postBody(this.BOOK_PATH + this.SEARCH, dataBody).pipe(
            map((res) => {
                if (res) {
                    return res;
                } else {
                    return {};
                }
            })
        );
    }

    getConditionString(searchBookDto: SearchBookDto) {
        let conditionStr = '';

        if (searchBookDto.code) {
            conditionStr += `code:'*${searchBookDto.code}*'`;
        }

        if (searchBookDto.name) {
            conditionStr += conditionStr
                ? ` and name:'${searchBookDto.name}'`
                : `name:'${searchBookDto.name}'`;
        }

        if (searchBookDto.categoryId) {
            conditionStr += conditionStr
                ? ` and categoryId:${searchBookDto.categoryId}`
                : `categoryId:${searchBookDto.categoryId}`;
        }

        if (searchBookDto.publisherId) {
            conditionStr += conditionStr
                ? ` and publisherId:${searchBookDto.publisherId}`
                : `publisherId:${searchBookDto.publisherId}`;
        }

        if (searchBookDto.publishingYear) {
            conditionStr += conditionStr
                ? ` and publishingYear:${searchBookDto.publishingYear}`
                : `publishingYear:${searchBookDto.publishingYear}`;
        }

        return conditionStr
            ? `&filter=${encodeURIComponent(conditionStr)}`
            : '';
    }
}
