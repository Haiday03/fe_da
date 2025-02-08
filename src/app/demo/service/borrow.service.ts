import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { Observable, map } from 'rxjs';
import { SearchBorrowedHistoryDto } from '../api/searchDto/search_borrowed_history_dto';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PaginationDto } from '../api/pagination/pagination';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  baseURL=environment.API_BASE_PATH;
  BORROW_PATH = '/borrow';

  constructor(private apiService: ApiService, private http: HttpClient) { }

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

  getBorrowPage(pagination: PaginationDto, searchBorrowedHistoryDto: SearchBorrowedHistoryDto){
    console.log('hoi can can nhe!');
    
    var conditionStr = this.getBorrowConditionString(searchBorrowedHistoryDto);
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
    console.log('hoi can can nhe2!');

    var conditionStr = this.getReviewConditionString(searchBorrowedHistoryDto);
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

  post(borrow): Observable<any>{
    return this.apiService.post(this.BORROW_PATH, borrow).pipe(map(
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

  put(id, borrow): Observable<any>{
    return this.apiService.put(this.BORROW_PATH + '/' + id, borrow).pipe(map(
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

  deleteReviewById(id): Observable<any>{
    return this.apiService.delete(this.BORROW_PATH + "/del/review/" + id).pipe(map(
      res => {
        if(res)
          return res;
        else
          return {};
      }
    ))
  }

  deleteListReviews(listReview): Observable<any>{
    return this.apiService.deleteList(this.BORROW_PATH + "/del/list-review", listReview);
  }

  deleteList(list): Observable<any>{
    return this.apiService.deleteList(this.BORROW_PATH, list);
  }

  updateBorrowStatus(id): Observable<any>{
    this.apiService.updateBorrowStatus(`${this.BORROW_PATH}/status/${id}`).pipe(map(
      res => console.log(res.status)
    ));
    
    return this.apiService.updateBorrowStatus(`${this.BORROW_PATH}/status/${id}`);
  }

  getDashboardData(): Observable<any>{
    return this.apiService.getById(this.BORROW_PATH + '/get/dasboard').pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }

  exportToExcel(searchBorrowedHistoryDto: SearchBorrowedHistoryDto): Observable<void> {
    var conditionStr = this.getBorrowConditionString(searchBorrowedHistoryDto);
    return this.http.get(this.baseURL + `api/borrow/export/excel?${conditionStr}`, {
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      map((response: HttpResponse<Blob>) => {
        const blob = new Blob([!!response.body ? response.body : new Uint8Array()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'danh_sach_muon_tra.xlsx');
      })
    );
  }

  exportReviewExcel(searchBorrowedHistoryDto: SearchBorrowedHistoryDto): Observable<void> {
    var conditionStr = this.getReviewConditionString(searchBorrowedHistoryDto);
    if(conditionStr){
      conditionStr += " and rating>0";
    } else {
      conditionStr = "&filter=rating>0";
    }
    return this.http.get(this.baseURL + `api/borrow/export/review-excel?${conditionStr}`, {
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      map((response: HttpResponse<Blob>) => {
        const blob = new Blob([!!response.body ? response.body : new Uint8Array()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'danh_sach_danh_gia.xlsx');
      })
    );
  }

  getBorrowConditionString(searchBorrowedHistoryDto: SearchBorrowedHistoryDto){
    var conditionStr = '';
    if(typeof searchBorrowedHistoryDto.fromDate!='undefined' && searchBorrowedHistoryDto.fromDate){
      conditionStr += ` createdDate>:'${searchBorrowedHistoryDto.fromDate}'`;
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

  getReviewConditionString(searchBorrowedHistoryDto: SearchBorrowedHistoryDto){
    var conditionStr = '';
    if(typeof searchBorrowedHistoryDto.fromDate!='undefined' && searchBorrowedHistoryDto.fromDate){
      conditionStr += ` reviewedDate>:'${searchBorrowedHistoryDto.fromDate}'`;
    }
    if(typeof searchBorrowedHistoryDto.toDate!='undefined' && searchBorrowedHistoryDto.toDate){
      if(conditionStr){
        conditionStr += ` and reviewedDate<:'${searchBorrowedHistoryDto.toDate} 23:59:59'`;
      } else {
        conditionStr += `reviewedDate<:'${searchBorrowedHistoryDto.toDate} 23:59:59'`;
      }
    }

    if(conditionStr){
      conditionStr = "&filter=" + conditionStr;
    }

    return conditionStr;
  }

  getReviewsByBookId(bookId){
    return this.apiService.getById(this.BORROW_PATH + '/review/' + bookId).pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }
}
