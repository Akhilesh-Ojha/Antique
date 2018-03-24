import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart()
  }


  logout() {
    this.auth.logout();
  }



}
