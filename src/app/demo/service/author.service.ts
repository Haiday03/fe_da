import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchAuthorDto } from '../api/searchDto/search_author_dto';
import { PaginationDto } from '../api/pagination/pagination';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  AUTHOR_PATH = '/author';
  AUTHOR_PATH_PAGE = '/pagination';
  FIND_ALL_BY_NAME_PATH = '/find?name=';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.apiService.getAll(this.AUTHOR_PATH).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  findAllByName(name){
    return this.apiService.findAllByName(this.AUTHOR_PATH + this.FIND_ALL_BY_NAME_PATH + name).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getById(id: number): Observable<any> {
    return this.apiService.getById(this.AUTHOR_PATH + '/' + id).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  post(author): Observable<any> {
    return this.apiService.post(this.AUTHOR_PATH, author).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  put(id,author): Observable<any> {
    return this.apiService.put(this.AUTHOR_PATH + '/' + id, author).pipe(map(
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
    return this.apiService.delete(this.AUTHOR_PATH + '/' + id).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getPage(pagination: PaginationDto, searchAuthorDto: SearchAuthorDto){
    var conditionStr = this.getConditionString(searchAuthorDto);
    return this.apiService.getAll(`${this.AUTHOR_PATH}/get/page?page=${pagination.page}&size=${pagination.size}${conditionStr}`).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getConditionString(searchAuthorDto: SearchAuthorDto){
    var conditionStr = '';
    if(typeof searchAuthorDto.searchCode!='undefined' && searchAuthorDto.searchCode){
      conditionStr += `code~'*${searchAuthorDto.searchCode}*'`;
    }
    if(typeof searchAuthorDto.searchName!='undefined' && searchAuthorDto.searchName){
      if(conditionStr){
        conditionStr += `and name~'*${searchAuthorDto.searchName}*'`;
      } else {
        conditionStr += `name~'*${searchAuthorDto.searchName}*'`;
      }
    }
    if(typeof searchAuthorDto.searchEmail!='undefined' && searchAuthorDto.searchEmail){
      if(conditionStr){
        conditionStr += `and email~'*${searchAuthorDto.searchEmail}*'`;
      } else {
        conditionStr += `email~'*${searchAuthorDto.searchEmail}*'`;
      }
    }
    if(typeof searchAuthorDto.searchPhoneNumber!='undefined' && searchAuthorDto.searchPhoneNumber){
      if(conditionStr){
        conditionStr += `and phoneNumber~'*${searchAuthorDto.searchPhoneNumber}*'`;
      } else {
        conditionStr += `phoneNumber~'*${searchAuthorDto.searchPhoneNumber}*'`;
      }
    }

    if(conditionStr){
      conditionStr = "&filter=" + conditionStr;
    }

    return conditionStr;
  }

  deleteList(listAuthors): Observable<any>{
    return this.apiService.deleteList(this.AUTHOR_PATH, listAuthors);
  }
}
