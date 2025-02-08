import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './general/api.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  CART_PATH = '/cart';
  ADD_BOOK ='/add-book';
  DELETE_BOOK="/delete-book"
  constructor(private apiService: ApiService) { }

  getCart(): Observable<any> {
    return this.apiService.getCart(this.CART_PATH).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  setFinished(): Observable<any> {
    return this.apiService.post(this.CART_PATH +"/finished").pipe(map(
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
    return this.apiService.post(this.CART_PATH + this.ADD_BOOK + "/" + bookId).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  delete(cartId: number,bookId: number): Observable<any> {
    return this.apiService.delete(this.CART_PATH + this.DELETE_BOOK + "/" + cartId + "/" + bookId).pipe(map(
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
