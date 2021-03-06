
import {Component, Input} from '@angular/core';
import {IProduct} from './product.repository';

@Component({
    selector: 'promoted-product-list',
    template: `
        <div *ngFor="let product of products | promoted">
        	<product [product]="product"></product>
        </div>
    `
})
export class PromotedProductListComponent {
    @Input() public products:Array<IProduct>;
}
 