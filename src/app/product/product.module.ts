
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './productList.component';
import { PromotedProductListComponent } from './promotedProductList.component';
import { PromotedPipe } from './promoted.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    PromotedPipe,
    PromotedProductListComponent
  ],
  exports:[
  	ProductListComponent,
  	PromotedPipe,
  	PromotedProductListComponent
  ]
})
export class ProductModule { }
