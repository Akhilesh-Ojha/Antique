import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  cart: ShoppingCart;
  subscription: Subscription;
  authSub: Subscription;
  userId: string;

  constructor(private shoppingCartService: ShoppingCartService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
    this.authSub = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice

        }
      })
    };

    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.authSub.unsubscribe();
  }

}
