
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IProduct} from './product.repository';

@Component({
    selector: 'product-list',
    template: `
        <div *ngFor="let product of products">
        	<product [product]="product" (deleted)="onDelete($event)"></product>
        </div>
    `
})
export class ProductListComponent {
    @Input() public products:Array<IProduct>;

    @Output() public deleted = new EventEmitter();

    onDelete(event){
      this.deleted.next(event);
    }
}
 