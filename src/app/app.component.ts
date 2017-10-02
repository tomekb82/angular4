import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from "@angular/forms";
import {TodoRepository} from "./todo/todo.repository";
import {ProductRepository, ProductRepositoryToken, IProduct} from "./product/product.repository";
import { Http } from '@angular/http';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, Subject } from 'rxjs';
import "rxjs/add/operator/map";
import * as _ from 'lodash'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'product-details',
    template: ` 
    <h1>Product details: {{name}}</h1>

    Price: {{product.price}}

    <img [src]="product.imageUrl" />

    
    `
})
export class ProductDetailsComponent implements OnInit{

  public name;
  public product;

  constructor (@Inject(ProductRepositoryToken) private productRepository: ProductRepository,
                private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
  
    this.activeRoute.params.subscribe(params => {
        this.name = params['name'];
        if(this.name){
          this.product = this.productRepository.getProductByName(this.name);//, product => {
          //  this.product = product;
          //});
        }
    });
  }  
}

@Component({
    selector: 'products',
    template: ` 
    <h1>All products:</h1>
    
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
  
    <div *ngIf="prom | async as products; else loading">
      <product-list [products]="products" (deleted)="onDelete($event)"></product-list>  
    </div>
    <ng-template #loading>
      Loading data
    </ng-template>`
})
export class ProductsComponent {

  public prom;
  public saveOnce = true;
  public tempProducts: Array<IProduct>;
  public products;
  public toggle = true;
  public sortByNameEnabled = false;

  constructor (@Inject(ProductRepositoryToken) private productRepository: ProductRepository) {

    this.prom = productRepository.getProductsStream();            
    this.prom.subscribe((products)=>{
      if(this.saveOnce){
        this.tempProducts = products;
      }
    });
  }

  /* Filtering & sorting */
  changeToggle(){
    this.toggle = !this.toggle;
  }

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
    template: `
    <h1> Add product </h1>
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
  `
})
export class ProductFormComponent {

  constructor (@Inject(ProductRepositoryToken) private productRepository: ProductRepository) {}

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
    selector: 'promoted-products',
    template: `
    <h1>Promoted products:</h1> 
    <div *ngIf="productPromise | async as products; else loading">
      <promoted-product-list [products]="products"></promoted-product-list> 
    </div>
    <ng-template #loading>
      Loading data
    </ng-template> `
})
/*<product-list [products]="products | promoted"></product-list> */
export class PromotedProductsComponent implements OnInit{

  public products: Array<IProduct>;
  public productPromise: Promise<Array<IProduct>>;
 
  public ngOnInit (): void {
    this.productPromise = new Promise((resolve) => {
      setTimeout(
        () => resolve(this.products),
        2000
      );
    });
  }

  constructor (@Inject(ProductRepositoryToken) private productRepository: ProductRepository) {
    this.products = productRepository.getProducts();
  }
}

@Component({
    selector: 'todos',
    template: `
    <h1>TODOS</h1>
      
    Normal component: 
    <my-todo *ngFor="let todo of todos" [todo]="todo"></my-todo>
  
    <br/>
    Get data from Http (json file)
    <my-todo *ngFor="let todo of todosHttp" [todo]="todo"></my-todo>
  
    <br/>
    Add todo using form
    <div>
      <form [formGroup]="todoForm">
        <label>
          Title: <input type="text" [formControlName]="'title'" />
        </label>
        <button (click)="addTodo()">Add</button>
      </form>
      <my-todo *ngFor="let todo of todos" [todo]="todo"></my-todo>
    </div>
    `
})
export class TodosComponent{

  public todos: Array<Object> = [];
  public todosHttp;
  public todoForm: FormGroup;
  
  constructor (todoRepository: TodoRepository,
              @Inject(ProductRepositoryToken) private productRepository: ProductRepository,
              http: Http,
              fb: FormBuilder) {
  
    this.todos = todoRepository.getTodos();

    http.get('/assets/todos.json')
      .map(res => res.json())
      .subscribe((todos) => this.todosHttp = todos);

    this.todoForm = fb.group({
      title: ['']
    });  
  }

  addTodo () {
    this.todos.push({title: this.todoForm.value.title, done: false});
  }
}

@Component({
    selector: 'events',
    template: `
    <h1>Events</h1>
    
    <div>
      Enter text: <input type="text" [formControl]="myInput">
      <ul>
        <li *ngFor="let value of values">{{ value }}</li>
      </ul>
    </div>

    <div>
      <button #button (click)="onClick(button)">Click me!</button>
      <ul>
        <li *ngFor="let click of clicks">{{ click }}</li>
      </ul>
    </div>

    <my-timer (tick)="onTick($event)"></my-timer>
    <ul>
      <li *ngFor="let tick of ticks">{{ tick.toLocaleTimeString() }}</li>
    </ul> 
    `
})
export class EventsComponent{

  public values: Array<string> = [];
  public clicks: Array<string> = [];
  public myInput = new FormControl();

  constructor (@Inject(ProductRepositoryToken) private productRepository: ProductRepository) {
    //Then we have access to an observable emitting new event every time value changes
    this.myInput.valueChanges
      .subscribe(value => this.values.push(value));
  }
  
  /* Events */
  
  //We need to create a method in component class, notify that button is DOM element
  public onClick (button) {
    this.clicks.push(`clicked button ${button.textContent}`);
  }

  public ticks: Array<Date> = [];

  public onTick (tick: Date) {
    this.ticks.push(tick);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title = 'Shop with list of all products'; 
 
  constructor () {}

}
