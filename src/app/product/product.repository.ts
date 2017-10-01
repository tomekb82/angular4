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
    save(product:IProduct);
    delete(product:IProduct);
    sort(type,toggle:boolean);
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
  error;

	constructor(private http:Http){
		this.getProductsRx();
	}

  save(product:IProduct){

    this.products.push(product);
    this.productStream.next(this.products);
  }

  delete(product:IProduct){
    this.products = _.remove(this.products, function(o) { 
      return o.name!=product.name; 
    });
    this.productStream.next(this.products);
  }

  sort(type,toggle:boolean){
    this.products.sort((a,b) => {
      if((type=="price" && a.price > b.price) 
        || (type=="name" && a.name > b.name)  ){
        return toggle ? 1 : -1;
      }else{
        return toggle ? -1: 1;
      }
    });
    this.productStream.next(this.products);
  }


  getProductsStream(){
    return Observable
      .from(this.productStream)
      .startWith(this.products);
  }
	
  getProductSubject(){
    return this.productStream;
  }

  private NUM_OF_RETRIES = 0;

  getProductsRx() {
    this.http.get(this.SERVICE_URL)
      .map(res =>  _.values(res.json()))
      .do(products => this.products = products)
      .subscribe(
        (products:Response) => {
          this.productStream.next(products);
        },
        (err) => {  
          this.NUM_OF_RETRIES++;
           if(this.NUM_OF_RETRIES < 5){
             setTimeout(() => {
               this.getProductsRx();
             }, 1000*this.NUM_OF_RETRIES);
           } 
        }
      );
  }

  public getProducts (): IProduct[] {
    return this.products;
  }
}

export const ProductRepositoryToken = new InjectionToken('ProductRepository');
