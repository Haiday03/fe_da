import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  COMMENT_PATH = '/comment';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAll(bookId): Observable<any> {
    return this.apiService.getAll(this.COMMENT_PATH+"/"+bookId).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  post(comment): Observable<any> {
    return this.apiService.post(this.COMMENT_PATH, comment).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  put(id,comment): Observable<any> {
    return this.apiService.put(this.COMMENT_PATH + '/' + id, comment).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  delete(id):  Observable<any> {
    return this.apiService.delete(this.COMMENT_PATH +"/"+id).pipe(map(
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
