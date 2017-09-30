
import {Component, Input} from '@angular/core';
import {IProduct} from './product.repository';

@Component({
    selector: 'product-list',
    template: `
        <div *ngFor="let product of products">
        	<product [product]="product"></product>
        </div>
    `
})
export class ProductListComponent {
    // To receive data we use Input annotation
    @Input() public products:Array<IProduct>;
}
 