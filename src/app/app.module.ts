import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProductModule } from './product/product.module';
import { TimerComponent } from './timer/timer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoComponent} from './todo/todo.component';
import { TodoRepository} from './todo/todo.repository';
import { InMemoryProductRepository, ProductRepositoryToken } from "./product/product.repository";

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [TodoRepository, {provide: ProductRepositoryToken, useClass: InMemoryProductRepository}],
  bootstrap: [AppComponent]
})
export class AppModule { }
