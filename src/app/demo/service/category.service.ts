import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { Observable, map } from 'rxjs';
import { SearchCategoryDto } from '../api/searchDto/search_category_dto';
import { PaginationDto } from '../api/pagination/pagination';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  CATEGORY_PATH = '/category';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<any> {
    return this.apiService.getAll(this.CATEGORY_PATH).pipe(map(
      res => {
        if(res)
          return res;
        else 
          return {};
      }
    ))
  }

  post(category): Observable<any>{
    return this.apiService.post(this.CATEGORY_PATH, category).pipe(map(
      res => {
        if(res)
          return res;
        else
          return {};
      }
    ))
  }

  getOne(id): Observable<any>{
    return this.apiService.getById(this.CATEGORY_PATH + '/' + id).pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }

  put(id, category): Observable<any>{
    return this.apiService.put(this.CATEGORY_PATH + '/' + id, category).pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }

  deleteOne(id): Observable<any>{
    return this.apiService.delete(this.CATEGORY_PATH + '/' + id).pipe(map(
      res => {
        if(res)
          return res;
        else
          return {};
      }
    ))
  }

  deleteList(listCategory): Observable<any>{
    return this.apiService.deleteList(this.CATEGORY_PATH, listCategory);
  }

  getPage(pagination: PaginationDto, searchCategoryDto: SearchCategoryDto){
    var conditionStr = this.getConditionString(searchCategoryDto);
    return this.apiService.getAll(`${this.CATEGORY_PATH}/get/page?page=${pagination.page}&size=${pagination.size}${conditionStr}`).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getConditionString(searchCategoryDto: SearchCategoryDto){
    var conditionStr = '';
    if(typeof searchCategoryDto.code!='undefined' && searchCategoryDto.code){
      conditionStr += `code~'*${searchCategoryDto.code}*'`;
    }
    if(typeof searchCategoryDto.name!='undefined' && searchCategoryDto.name){
      if(conditionStr){
        conditionStr += `and name~'*${searchCategoryDto.name}*'`;
      } else {
        conditionStr += `name~'*${searchCategoryDto.name}*'`;
      }
    }

    if(conditionStr){
      conditionStr = "&filter=" + conditionStr;
    }

    return conditionStr;
  }

  getTop5(): Observable<any>{
    return this.apiService.getById(this.CATEGORY_PATH + '/get/top-5').pipe(map(
      res => {
        if(res)
          return res;
        else  
          return {};
      }
    ))
  }
}
