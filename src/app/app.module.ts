import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProductModule } from './product/product.module';
import { TimerComponent } from './timer/timer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';                                                        

import { AppComponent, ProductsComponent, ProductFormComponent, PromotedProductsComponent, TodosComponent,EventsComponent } from './app.component';
import { TodoComponent} from './todo/todo.component';
import { TodoRepository} from './todo/todo.repository';
import { InMemoryProductRepository, ProductRepositoryToken } from "./product/product.repository";

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {path: 'list', component: ProductsComponent},
    {path: 'add', component: ProductFormComponent},
    {path: 'promoted', component: PromotedProductsComponent},
    {path: 'todos', component: TodosComponent},
    {path: 'events', component: EventsComponent},
    {path: '', component: ProductsComponent},
    {path: '**', component: ProductsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent, 
    ProductFormComponent,
    PromotedProductsComponent,
    TodosComponent,
    EventsComponent,
    TodoComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,    
    FormsModule,                         
    ProductModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)                                                                                                                  
  ],
  providers: [TodoRepository, {provide: ProductRepositoryToken, useClass: InMemoryProductRepository}],
  bootstrap: [AppComponent]
})
export class AppModule { }                                                                                                                                      
