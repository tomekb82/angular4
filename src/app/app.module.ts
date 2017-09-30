import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProductModule } from './product/product.module';
import { TimerComponent } from './timer/timer.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent} from './todo/todo.component';
import { TodoRepository} from './todo/todo.repository';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    ReactiveFormsModule
  ],
  providers: [TodoRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
