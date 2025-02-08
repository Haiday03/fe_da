import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { Observable, map } from 'rxjs';
import { SearchBorrowedHistoryDto } from '../api/searchDto/search_borrowed_history_dto';
import { PaginationDto } from '../api/pagination/pagination';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrowedHistoryService {
  BORROW_PATH = '/borrow';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<any> {
    return this.apiService.getAll(this.BORROW_PATH).pipe(map(
      res => {
        if(res)
          return res;
        else 
          return {};
      }
    ))
  }

  post(borrowed_history): Observable<any>{
    return this.apiService.post(this.BORROW_PATH, borrowed_history).pipe(map(
      res => {
        if(res)
          return res;
        else
          return {};
      }
    ))
  }

  getOne(id): Observable<any>{
    return this.apiService.getById(this.BORROW_PATH + '/' + id).pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }

  put(id, borrowed_history): Observable<any>{
    return this.apiService.put(this.BORROW_PATH + '/' + id, borrowed_history).pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }

  deleteOne(id): Observable<any>{
    return this.apiService.delete(this.BORROW_PATH + '/' + id).pipe(map(
      res => {
        if(res)
          return res;
        else
          return {};
      }
    ))
  }

  deleteList(listBorrowedHistory): Observable<any>{
    return this.apiService.deleteList(this.BORROW_PATH, listBorrowedHistory);
  }

  getPage(pagination: PaginationDto, searchBorrowedHistoryDto: SearchBorrowedHistoryDto){
    console.log('hoi can can roi do!');
    
    var conditionStr = this.getConditionString(searchBorrowedHistoryDto);
    return this.apiService.getAll(`${this.BORROW_PATH}/get/page?page=${pagination.page}&size=${pagination.size}${conditionStr}`).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getReviewPage(pagination: PaginationDto, searchBorrowedHistoryDto: SearchBorrowedHistoryDto){
    var conditionStr = this.getConditionString(searchBorrowedHistoryDto);
    if(conditionStr){
      conditionStr += " and rating>0";
    } else {
      conditionStr = "&filter=rating>0";
    }
    return this.apiService.getAll(`${this.BORROW_PATH}/get/page?page=${pagination.page}&size=${pagination.size}${conditionStr}`).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getConditionString(searchBorrowedHistoryDto: SearchBorrowedHistoryDto){
    var conditionStr = '';
    var currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    var username = currentUser['username'];
    // conditionStr += `borrower.username~'${username}'`;
    conditionStr += `borrower.username:'${username}'`;
    if(typeof searchBorrowedHistoryDto.fromDate!='undefined' && searchBorrowedHistoryDto.fromDate){
      conditionStr += ` and createdDate>:'${searchBorrowedHistoryDto.fromDate}'`;
    }
    if(typeof searchBorrowedHistoryDto.toDate!='undefined' && searchBorrowedHistoryDto.toDate){
      if(conditionStr){
        conditionStr += ` and createdDate<:'${searchBorrowedHistoryDto.toDate} 23:59:59'`;
      } else {
        conditionStr += `createdDate<:'${searchBorrowedHistoryDto.toDate} 23:59:59'`;
      }
    }
    if(typeof searchBorrowedHistoryDto.status!='undefined' && searchBorrowedHistoryDto.status != 0){
      if(conditionStr){
        conditionStr += ` and status:${searchBorrowedHistoryDto.status}`;
      } else {
        conditionStr += `status:${searchBorrowedHistoryDto.status}`;
      }
    }

    if(conditionStr){
      conditionStr = "&filter=" + conditionStr;
    }

    return conditionStr;
  }

}
