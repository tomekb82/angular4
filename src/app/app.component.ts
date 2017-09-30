import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from "@angular/forms";
import {TodoRepository} from "./todo/todo.repository";
import {ProductRepository, ProductRepositoryToken, IProduct} from "./product/product.repository";
import { Http } from '@angular/http';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, Subject } from 'rxjs';
import "rxjs/add/operator/map";
import * as _ from 'lodash'; 

// create 2 dumb components
@Component({
    selector: 'a-comp',
    template: `<div>Component A</div>`
})
export class AComponent {}

@Component({
    selector: 'b-comp',
    template: `<div>Component B</div>`
})
export class BComponent {}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private title = 'Shop with list of all products';
  public tempProducts: Array<IProduct>;
  public tempProducts2: Array<IProduct>;
  public todos: Array<Object> = [];
  public todosHttp;
  public todoForm: FormGroup;
  public productPromise: Promise<Array<IProduct>>;
  public products;
  public prom;

    public ngOnInit (): void {
        this.productPromise = new Promise((resolve) => {
            setTimeout(
                () => resolve(this.tempProducts2),
                1000
            );
        });

        this.copyProducts();
    }

     constructor (todoRepository: TodoRepository,
             @Inject(ProductRepositoryToken) productRepository: ProductRepository,
             http: Http,
             fb: FormBuilder) {

        this.tempProducts2 = productRepository.getProducts();
        this.todos = todoRepository.getTodos();
        //Then we have access to an observable emitting new event every time value changes
        this.myInput.valueChanges.subscribe(value => this.values.push(value));
 
       /*http.get('/assets/todos.json')
            .map(res => res.json())
            .subscribe((todos) => this.todosHttp = todos);*/

       /*productRepository.getProductsStream().subscribe((products)=>{
          this.tempProducts = products;
          this.copyProducts();
       });*/
       this.prom = productRepository.getProductsStream();

       this.todoForm = fb.group({
            title: ['']
        });     
    }

    /* Filtering & sorting */
    toggle = true;
    changeToggle(){
      this.toggle = !this.toggle;
    }

    public onSort (button) {
        this.products.sort((a,b) => {
          if(a.name > b.name){
            return this.toggle ? 1 : -1;
          }else{
            return this.toggle ? -1: 1;
          }

        });
        this.changeToggle();
    }
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

    addTodo () {
        this.todos.push({title: this.todoForm.value.title, done: false});
    }

    /* Events */
    public clicks: Array<string> = [];
    //We need to create a method in component class, notify that button is DOM element
    public onClick (button) {
        this.clicks.push(`clicked button ${button.textContent}`);
    }
    public ticks: Array<Date> = [];

    public onTick (tick: Date) {
        this.ticks.push(tick);
    }

    /* Forms */
    public values: Array<string> = [];
    //And create a control instance...
    public myInput = new FormControl();

}
