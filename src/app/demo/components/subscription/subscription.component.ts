import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { SubscriptionService } from '../../service/subscription/subscription.service';
@Component({
    templateUrl: './subscription.component.html',
})
export class SubscriptionComponent implements OnInit {

  yearlyPriceId: string='price_1LhWGsKGVegvSJ1zggwWkkdN';
  monthlyPriceId: string='price_1LhWGsKGVegvSJ1zueZF02p4';
  
  currentUser = {};

  //invoice: any;

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');

    // this.http.get(`${environment.API_BASE_PATH}stripe`).subscribe(
    //   res => {
    //     this.invoice = res;
    //   },
    // );
  }

  // load the stripejs
  stripePromise = loadStripe(environment.stripe);

  async checkoutMonthly(): Promise<void> {
    this.checkout(this.monthlyPriceId,"PREMIUM");
  }

  async checkoutYearly(): Promise<void> {
    this.checkout(this.yearlyPriceId,"PRO");
  }

  /**
   * this method do the checkout for a priceId and it is async because it awaiting the Promise object
   */
  private async checkout(priceId: string, type:string): Promise<void> {
    const checkout = {
      name: this.currentUser['username'],
      dateCreated: Date.now(),
      priceId: priceId,
      type:type,
      cancelUrl: 'https://library-bachelor-frontend.herokuapp.com/#/subscription',
      successUrl: 'https://library-bachelor-frontend.herokuapp.com/#/success',
    };
    const stripe = await this.stripePromise;
    // this is a normal http calls for a backend api
    this.subscriptionService
      .post( checkout)
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
  }
}
