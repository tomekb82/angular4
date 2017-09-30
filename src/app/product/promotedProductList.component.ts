
import {Component, Input} from '@angular/core';
import {IProduct} from './product.component';

@Component({
    selector: 'promoted-product-list',
    template: `
        <div *ngFor="let product of products | promoted">
        	<product [product]="product"></product>
        </div>
    `
})
export class PromotedProductListComponent {
    // To receive data we use Input annotation
    @Input() public products:Array<IProduct>;
}
 