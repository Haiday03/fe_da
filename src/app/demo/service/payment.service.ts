import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    PAYMENT_PATH = '/payment';

    constructor(private apiService: ApiService) {}

    payment(amount: number, url: string, quantity: number) {
      const params = new HttpParams().set('amount', amount.toString())
      .set('vnp_ReturnUrl', url)
      .set('quantity', quantity);
      console.log('Payment amount:', params);
      
        return this.apiService
            .getAllWithParams(this.PAYMENT_PATH + '/create-payment', { params })
            .pipe(
                map((res) => {
                    if (res) {
                        return res;
                    } else {
                        return {};
                    }
                })
            );
    }

    verifyPayment(vnpSecureHash: string, request: HttpParams) {
        // console.log('Param verify', request);
        const params = new HttpParams().set('vnp_ResponseCode', vnpSecureHash);

        // request.set("vnp_SecureHash", vnpSecureHash);
        return this.apiService
            .getAllWithParams(this.PAYMENT_PATH + '/verify-payment', { params, request })
            .pipe(
                map((res) => {
                    if (res) {
                        return res;
                    } else {
                        return {};
                    }
                })
            );
    }
}
