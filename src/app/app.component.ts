import { Component, OnInit } from '@angular/core';

interface Product{
      name: string,
      price:number,
      description:string,
      promoted: boolean,
      tags: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private title = 'Shop with list of all products';

  private products: Array<Product> = [
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

  public todos: Array<Object> = [
        {title: 'my first todo', done: false},
        {title: 'my second todo', done: true}
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
