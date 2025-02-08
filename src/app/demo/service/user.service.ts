import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchUserDto } from '../api/searchDto/search_user_dto';
import { PaginationDto } from '../api/pagination/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  USER_PATH = '/user';
  CHANGE_PASSWORD_PATH = '/change-password';
  constructor(private apiService: ApiService) { }

  getAll(): Observable<any> {
    return this.apiService.getAll(this.USER_PATH).pipe(map(
      res => {
        if(res) {
          return res;
        } else {
          return {};
        }
      }
    ))
  }

  getOne(id): Observable<any>{
    return this.apiService.getById(this.USER_PATH + '/' + id).pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }

  deleteOne(username): Observable<any>{
    return this.apiService.delete(this.USER_PATH + '/' + username).pipe(map(
      res => {
        if(res)
          return res;
        else
          return {};
      }
    ))
  }

  deleteList(list): Observable<any>{
    return this.apiService.deleteList(this.USER_PATH, list);
  }

  getByName(username: string): Observable<any> {
    return this.apiService.getByName(this.USER_PATH + '/' + username).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getUsersCount(): Observable<any> {
    return this.apiService.getUsersCount(this.USER_PATH + '/getUsersCount').pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  UsersMonthly(): Observable<any> {
    return this.apiService.usersMonthly(this.USER_PATH + '/usersMonthly').pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  put(username: string, user): Observable<any> {
    return this.apiService.put(this.USER_PATH + '/' + username, user).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  post(category): Observable<any>{
    return this.apiService.post(this.USER_PATH, category).pipe(map(
      res => {
        if(res)
          return res;
        else
          return {};
      }
    ))
  }

  update(id, user): Observable<any> {
    return this.apiService.put(this.USER_PATH + '/' + id, user).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }


  changePassword(params): Observable<any> {
    return this.apiService.patch(this.USER_PATH + this.CHANGE_PASSWORD_PATH, params).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getPage(pagination: PaginationDto, searchUserDto: SearchUserDto){
    var conditionStr = this.getConditionString(searchUserDto);
    return this.apiService.getAll(`${this.USER_PATH}/get/page?page=${pagination.page}&size=${pagination.size}${conditionStr}`).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getConditionString(searchUserDto: SearchUserDto){
    var conditionStr = '';
    if(typeof searchUserDto.username!='undefined' && searchUserDto.username){
      conditionStr += `username~'*${searchUserDto.username}*'`;
    }
    if(typeof searchUserDto.email!='undefined' && searchUserDto.email){
      if(conditionStr){
        conditionStr += `and email~'*${searchUserDto.email}*'`;
      } else {
        conditionStr += `email~'*${searchUserDto.email}*'`;
      }
    }
    if(typeof searchUserDto.phoneNumber!='undefined' && searchUserDto.phoneNumber){
      if(conditionStr){
        conditionStr += `and phoneNumber:${searchUserDto.phoneNumber}`;
      } else {
        conditionStr += `phoneNumber~'*${searchUserDto.phoneNumber}*'`;
      }
    }
    if(typeof searchUserDto.roleCode!='undefined' && searchUserDto.roleCode){
      if(conditionStr){
        conditionStr += `and roleCode:'${searchUserDto.roleCode}'`;
      } else {
        conditionStr += `roleCode:'${searchUserDto.roleCode}'`;
      }
    }

    if(conditionStr){
      conditionStr = "&filter=" + conditionStr;
    }

    return conditionStr;
  }
}
