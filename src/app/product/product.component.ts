import {Component, Input} from '@angular/core';
import {IProduct} from './product.repository';

@Component({
    selector: 'product',
    template: `
        <div class="w3-card-4" style="width:300px; height:350px; float:left">
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
}
