import {Injectable, InjectionToken, OnInit} from "@angular/core";
import { Http,Response } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash'; 

export interface IProduct{
      name: string,
      price:number,
      description:string,
      promoted: boolean,
      tags: string,
      imageUrl: string
}

export interface ProductRepository {
    getProducts(): IProduct[];
    getProductsStream();
    getProductSubject();
}

@Injectable()
export class InMemoryProductRepository implements ProductRepository{

  private SERVICE_URL = 'http://shining-torch-4509.firebaseio.com/products.json';

	products = [
    { 
      name:"Kurtka",
      price:250.00,
      description:"Naprawdę zajefajna kurtka",
      promoted:false,
      tags:"ubranie, gortex",
      imageUrl:"/assets/angular.png"
    },
    { 
      name:"Butki",
      price:204.00,
      description:"Zajebiste adidaski",
      promoted:true,
      tags:"ubranie, skóra",
      imageUrl:"/assets/angular.png"
    },
    { 
      name:"Spodnie",
      price:99.99,
      description:"Dziurawe dżinsy",
      promoted:true,
      tags:"ubranie, dżins",
      imageUrl:"/assets/angular.png"
    },
    { 
      name:"Okrasa",
      price:99.99,
      description:"Dziurawe dżinsy",
      promoted:false,
      tags:"ubranie, dżins",
      imageUrl:"/assets/angular.png"
    }
  ];

  productStream = new Subject();

	constructor(private http:Http){
		this.getProductsRx();
	}

  getProductsStream(){
    return Observable
      .from(this.productStream)
      .startWith(this.products);
  }
	
  getProductSubject(){
    return this.productStream;
  }

  getProductsRx() {
    this.http.get(this.SERVICE_URL)
      .map(res =>  _.values(res.json()))
      .do(products => this.products = products)
      .subscribe((products:Response) => {
        this.productStream.next(products);
      });
  }

  public getProducts (): IProduct[] {
    return this.products;
  }
}

export const ProductRepositoryToken = new InjectionToken('ProductRepository');
