import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProductModule } from './product/product.module';
import { TimerComponent } from './timer/timer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';                                                        

import { AppComponent,AComponent, BComponent } from './app.component';
import { TodoComponent} from './todo/todo.component';
import { TodoRepository} from './todo/todo.repository';
import { InMemoryProductRepository, ProductRepositoryToken } from "./product/product.repository";

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {path: 'a', component: AComponent},
    {path: 'b', component: BComponent},
    {path: '', component: AComponent},
    {path: '**', component: AComponent}
];

@NgModule({
  declarations: [
    AppComponent,AComponent, BComponent,
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
