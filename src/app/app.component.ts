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
    selector: 'products',
    template: ` <h1>All products:</h1>
  Find product: <input #in type="text" (input)="filterProduct(in.value)">
  <button (click)="onSortByPrice()" [disabled]="sortByNameEnabled">
    Sortuj po cenie 
    <span *ngIf="toggle"> >>  </span>
    <span *ngIf="!toggle"> <<  </span>
  </button> 
  <button (click)="onSortByName()">
    Sortuj po nazwie 
    <span *ngIf="toggle"> >>  </span>
    <span *ngIf="!toggle"> <<  </span>
  </button> 
  

  <div *ngIf="prom | async as products; else loading2">
    <product-list [products]="products" (deleted)="onDelete($event)"></product-list>  
  </div>
  <ng-template #loading2>
    Loading data
  </ng-template>`
})
export class ProductsComponent {

  public prom;
  public saveOnce = true;
  public tempProducts: Array<IProduct>;
   public products;
  

  constructor (@Inject(ProductRepositoryToken) private productRepository: ProductRepository) {

       this.prom = productRepository.getProductsStream();            
       this.prom.subscribe((products)=>{
         if(this.saveOnce){
           this.tempProducts = products;
         }
       });
  }

  /* Filtering & sorting */
    toggle = true;
    changeToggle(){
      this.toggle = !this.toggle;
    }

    sortByNameEnabled = false;
    public onSortByPrice() {
      this.productRepository.sort("price", this.toggle);
      this.changeToggle();
    }

    public onSortByName() {
      this.productRepository.sort("name", this.toggle);
      this.changeToggle();
    }
  
   public filterProduct(search){
     this.saveOnce = false;
     if(!search){
       this.products = Object.assign([], this.tempProducts);
     }else{
       this.products = this.tempProducts.filter(item => 
         item.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
     }
     this.productRepository.getProductSubject().next(this.products);
   } 


    public onDelete (product) {
      this.productRepository.delete(product);
    }


}



@Component({
    selector: 'product-form',
    template: `<div>
    <form #formRef="ngForm" novalidate="true" (ngSubmit)="addProduct(formRef.valid,newProduct)">
      <label>
        Name: <input type="text" #nameRef="ngModel" required [(ngModel)]="newProduct.name" name="name" />
        <div *ngIf="nameRef.touched || nameRef.dirty || formRef.submitted">
          <div *ngIf="nameRef.errors?.required">
            To pole jest wymagane
          </div>
        </div>
      </label>
      <label>
        Price: <input type="number" #priceRef="ngModel" required pattern="^[0-9]" min="0" [(ngModel)]="newProduct.price" name="price" />
        <div *ngIf="priceRef.touched || priceRef.dirty || formRef.submitted">
          <div *ngIf="priceRef.errors?.required">
            To pole jest wymagane
          </div>
          <div *ngIf="priceRef.errors?.min">
            To pole musi mieć większe od zera
          </div>
          <div *ngIf="priceRef.errors?.pattern">
            To pole musi być liczbą większą od zera
          </div>
        </div>
      </label>
      <label>
        Description: <textarea #descriptionRef="ngModel" required [(ngModel)]="newProduct.description" name="description" ></textarea>
        <div *ngIf="descriptionRef.touched || descriptionRef.dirty || formRef.submitted">
          <div *ngIf="descriptionRef.errors?.required">
            To pole jest wymagane
          </div>
        </div>
      </label>
      <label>
        Image URL: <input type="url" #imageUrlRef="ngModel" pattern="https?://.+" required [(ngModel)]="newProduct.imageUrl" name="imageUrl" />
        <div *ngIf="imageUrlRef.touched || imageUrlRef.dirty || formRef.submitted">
          <div *ngIf="imageUrlRef.errors?.required">
            To pole jest wymagane
          </div>
          <div *ngIf="imageUrlRef.errors?.pattern">
            Niepoprawny adres URL.
          </div>
        </div>
      </label>

      <button type="submit">Add</button>
    </form>
  </div>`
})
export class ProductFormComponent {

  constructor (@Inject(ProductRepositoryToken) private productRepository: ProductRepository) {

  }

  private newProduct = {
      name:"",
      price: "",
      description:"",
      imageUrl:""
  };

  addProduct(valid, product){
      if(!valid){
        return;
      }
      this.productRepository.save(product);  
  }


}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private title = 'Shop with list of all products';
  public tempProducts2: Array<IProduct>;
  public todos: Array<Object> = [];
  public todosHttp;
  public todoForm: FormGroup;
  public productPromise: Promise<Array<IProduct>>;
 
    public ngOnInit (): void {
        this.productPromise = new Promise((resolve) => {
            setTimeout(
                () => resolve(this.tempProducts2),
                1000
            );
        });
    }

     constructor (todoRepository: TodoRepository,
             @Inject(ProductRepositoryToken) private productRepository: ProductRepository,
             http: Http,
             fb: FormBuilder) {

        this.tempProducts2 = productRepository.getProducts();

        this.todos = todoRepository.getTodos();
        //Then we have access to an observable emitting new event every time value changes
        this.myInput.valueChanges
          .subscribe(value => this.values.push(value));
 
       /*http.get('/assets/todos.json')
            .map(res => res.json())
            .subscribe((todos) => this.todosHttp = todos);*/

       this.todoForm = fb.group({
            title: ['']
        });  

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

    addTodo () {
        this.todos.push({title: this.todoForm.value.title, done: false});
    }

}
