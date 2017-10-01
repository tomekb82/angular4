import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IProduct} from './product.repository';

@Component({
    selector: 'product',
    template: `
        <div class="w3-card-4" style="width:300px; height:350px; float:left">
          <button style="float:right" (click)="onDelete()">X</button>
          <div [ngStyle]="{'background-image': 'url(' + product.imageUrl + ') ' , 'background-size': 'cover',height: '250px',width: '300px'}" > </div>
          <div class="w3-container w3-center">
            <div style="white-space: nowrap;  overflow: hidden; text-overflow: ellipsis">
              <span style="font-size:20px; font-weight: bold;">{{product.name}}</span>
             </div>
            <h4> Price:{{product.price}} PLN</h4>
          
          </div>
        </div>
    `
})

export class ProductComponent {
    // To receive data we use Input annotation
    @Input() public product:IProduct;
    @Output() public deleted = new EventEmitter();

    onDelete(){
      this.deleted.next(this.product);
    }

}
