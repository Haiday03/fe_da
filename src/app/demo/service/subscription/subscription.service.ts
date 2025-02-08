import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../general/api.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  SUBSCRIPTION_PATH = '/subscription';
 

  constructor(private apiService: ApiService, private http: HttpClient) { }

  post(param)
  {
    return this.apiService.post(this.SUBSCRIPTION_PATH,param).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getSubs(){
    return this.apiService.getSubs(this.SUBSCRIPTION_PATH).pipe(map(
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
