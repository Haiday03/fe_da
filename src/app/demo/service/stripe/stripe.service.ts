import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../general/api.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  STRIPE_PATH = '/stripe';
  PAYMENT_PATH = '/payment'
  ORDER_PATH = '/orders';
 

  constructor(private apiService: ApiService, private http: HttpClient) { }

  post(param)
  {
    return this.apiService.post(this.STRIPE_PATH +this.PAYMENT_PATH,param).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }

  getOrders(){
    return this.apiService.getOrders(this.STRIPE_PATH+ this.ORDER_PATH).pipe(map(
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
