import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './general/api.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WishService {
  WISH_PATH = '/wish';
  ADD_BOOK ='/add-book';
  DELETE_BOOK="/delete-book"
  constructor(private apiService: ApiService) { }

  getWish(): Observable<any> {
    return this.apiService.getWish(this.WISH_PATH).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  post(bookId: number): Observable<any> {
    return this.apiService.post(this.WISH_PATH + this.ADD_BOOK + "/" + bookId).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  delete(wishId: number): Observable<any> {
    return this.apiService.delete(this.WISH_PATH + this.DELETE_BOOK + "/" + wishId).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
}
