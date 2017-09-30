import { Component, OnInit } from '@angular/core';

interface Product{
      name: string,
      price:number,
      description:string,
      promoted: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private title = 'Product title';

  private products: Array<Product> = [
  	{ name:"normal product 1",
  	  price:123,
  	  description:"description of product 1",
  	  promoted:false
  	},
	{ name:"promted product 2",
	  price:123,
  	  description:"description of product 2",
  	  promoted:true
  	},
  	{ name:"normal product 3",
  	  price:123,
  	  description:"description of product 3",
  	  promoted:false
  	}
  ];

  public productPromise: Promise<Array<Product>>;

    public ngOnInit (): void {
        this.productPromise = new Promise((resolve) => {
            setTimeout(
                () => resolve(this.products),
                5000
            );
        });
    }
  


}
