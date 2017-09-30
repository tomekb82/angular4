import {Injectable, InjectionToken, OnInit} from "@angular/core";
import { Http } from '@angular/http';
// 3. Depending on configuration we will need to import every Rx.js operator to use it
import "rxjs/add/operator/map";

export interface IProduct{
      name: string,
      price:number,
      description:string,
      promoted: boolean,
      tags: string
}


//3/ It is very useful to make our type hints against interface(or general - abstraction) instead of implementation
export interface ProductRepository /*extends OnInit*/{
    getProducts(): IProduct[];
}

@Injectable()
export class InMemoryProductRepository implements ProductRepository{

products;

	constructor(private http:Http){
	/*}
	public ngOnInit (): void {	
	*/	console.log('res');
			this.http.get('http://shining-torch-4509.firebaseio.com/products.json')
            .map(res => {console.log(res); return res.json();})
            .subscribe((products) => this.products = products);

            console.log(this.products);
	}

    public getProducts (): IProduct[] {

        return [
  	{ name:"Kurtka",
  	  price:250.00,
  	  description:"Naprawdę zajefajna kurtka",
  	  promoted:false,
      tags:"ubranie, gortex"
  	},
	{ name:"Butki",
	  price:204.00,
  	  description:"Zajebiste adidaski",
  	  promoted:true,
      tags:"ubranie, skóra"
  	},
  	{ name:"Spodnie",
  	  price:99.99,
  	  description:"Dziurawe dżinsy",
  	  promoted:false,
      tags:"ubranie, dżins"
  	},
  	{ name:"Okrasa",
  	  price:99.99,
  	  description:"Dziurawe dżinsy",
  	  promoted:false,
      tags:"ubranie, dżins"
  	}
  ];
    }
}

export const ProductRepositoryToken = new InjectionToken('ProductRepository');
