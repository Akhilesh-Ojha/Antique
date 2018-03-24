import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: any;
  subscription: Subscription

  category: string;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {


    productService.getAll().subscribe(products => {
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;

      });
    });



  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




}
