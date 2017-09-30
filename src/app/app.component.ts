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
  	{ name:"Kurtka",
  	  price:250.00,
  	  description:"Naprawdę zajefajna kurtka",
  	  promoted:false
  	},
	{ name:"Butki",
	  price:204.00,
  	  description:"Zajebiste adidaski",
  	  promoted:true
  	},
  	{ name:"Spodnie",
  	  price:99.99,
  	  description:"Dziurawe dżinsy",
  	  promoted:false
  	}
  ];

  public productPromise: Promise<Array<Product>>;

    public ngOnInit (): void {
        this.productPromise = new Promise((resolve) => {
            setTimeout(
                () => resolve(this.products),
                1000
            );
        });
    }
  


}
