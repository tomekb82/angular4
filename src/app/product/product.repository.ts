import {InjectionToken} from "@angular/core";

export interface IProduct{
      name: string,
      price:number,
      description:string,
      promoted: boolean,
      tags: string
}


//3/ It is very useful to make our type hints against interface(or general - abstraction) instead of implementation
export interface ProductRepository {
    getProducts(): IProduct[];
}

export class InMemoryProductRepository implements ProductRepository{
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
  	}
  ];
    }
}

export const ProductRepositoryToken = new InjectionToken('ProductRepository');
