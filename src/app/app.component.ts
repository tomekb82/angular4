import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from "@angular/forms";
import {TodoRepository} from "./todo/todo.repository";
import {ProductRepository, ProductRepositoryToken, IProduct} from "./product/product.repository";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private title = 'Shop with list of all products';

  public tempProducts: Array<IProduct>;/* = [
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
  ];*/

  public todos: Array<Object> = [];

  public productPromise: Promise<Array<IProduct>>;

    public ngOnInit (): void {
        /*this.productPromise = new Promise((resolve) => {
            setTimeout(
                () => resolve(this.tempProducts),
                1000
            );
        });*/

        this.copyProducts();
    }

     constructor (todoRepository: TodoRepository,
             @Inject(ProductRepositoryToken) productRepository: ProductRepository) {
       
       this.tempProducts = productRepository.getProducts();
       this.todos = todoRepository.getTodos();
        //Then we have access to an observable emitting new event every time value changes
        this.myInput.valueChanges.subscribe(value => this.values.push(value));
    }

    
    /* Events */
    public clicks: Array<string> = [];

    //3/ We need to create a method in component class, notify that button is DOM element
    public onClick (button) {
        this.clicks.push(`clicked button ${button.textContent}`);
    }

    public ticks: Array<Date> = [];

    public onTick (tick: Date) {
        this.ticks.push(tick);
    }

    public values: Array<string> = [];
    //And create a control instance...
    public myInput = new FormControl();


   products;
   public copyProducts(){
     this.products = Object.assign([], this.tempProducts);
   }

   public filterProduct(search){
     this.copyProducts();
     if(!search){
       return
     }
     this.products = this.tempProducts.filter(item => 
       item.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
   } 




}
