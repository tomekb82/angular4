import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from "@angular/forms";
import {TodoRepository} from "./todo/todo.repository";
import {ProductRepository, ProductRepositoryToken, IProduct} from "./product/product.repository";
import { Http } from '@angular/http';
// 3. Depending on configuration we will need to import every Rx.js operator to use it
import "rxjs/add/operator/map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private title = 'Shop with list of all products';

  public tempProducts: Array<IProduct>;
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

 public todosHttp;

     constructor (todoRepository: TodoRepository,
             @Inject(ProductRepositoryToken) productRepository: ProductRepository,
             http: Http) {

       this.tempProducts = productRepository.getProducts();
       this.todos = todoRepository.getTodos();
        //Then we have access to an observable emitting new event every time value changes
        this.myInput.valueChanges.subscribe(value => this.values.push(value));


        http.get('/assets/todos.json')
            .map(res => res.json())
            .subscribe((todos) => this.todosHttp = todos);
    }

    
    /* Events */
    public clicks: Array<string> = [];

    //3/ We need to create a method in component class, notify that button is DOM element
    public onClick (button) {
        this.clicks.push(`clicked button ${button.textContent}`);
    }

    public onSort (button) {
        this.products.sort((a,b) => {
          if(a>b){
            return -1
          }else{
            return 1;
          }

        });
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
