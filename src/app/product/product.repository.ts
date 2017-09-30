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
}

@Injectable()
export class InMemoryProductRepository implements ProductRepository{

	products = [
    { name:"Kurtka",
      price:250.00,
      description:"Naprawdę zajefajna kurtka",
      promoted:false,
      tags:"ubranie, gortex",
      imageUrl:"/assets/angular.png"
    },
  { name:"Butki",
    price:204.00,
      description:"Zajebiste adidaski",
      promoted:true,
      tags:"ubranie, skóra",
      imageUrl:"/assets/angular.png"
    },
    { name:"Spodnie",
      price:99.99,
      description:"Dziurawe dżinsy",
      promoted:true,
      tags:"ubranie, dżins",
      imageUrl:"/assets/angular.png"
    },
    { name:"Okrasa",
      price:99.99,
      description:"Dziurawe dżinsy",
      promoted:false,
      tags:"ubranie, dżins",
      imageUrl:"/assets/angular.png"
    }
  ];

	constructor(private http:Http){
		this.getProductsRx();
	}

	productStream = new Subject();
    getProductsStream(){
    	return Observable
        	.from(this.productStream)
          .startWith(this.products);
  }
	
  getProductsRx() {
    	this.http.get('http://shining-torch-4509.firebaseio.com/products.json')
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
