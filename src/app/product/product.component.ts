import {Component, Input} from '@angular/core';
import {IProduct} from './product.repository';

@Component({
    selector: 'product',
    template: `
        <div class="w3-card-4" style="width:50%; float:left">
          <img src="http://via.placeholder.com/300x100" alt={{product.name}} style="width:100%">
          <div class="w3-container w3-center" [ngStyle] = "{background:product.promoted ? 'yellow': 'white'}">
            <h2>{{product.name}}, Price:{{product.price}} pln</h2>
            <p>{{product.description}}</p>
            <p>Tags: {{product.tags}}</p>
          </div>
        </div>

    `
})
export class ProductComponent {
    // To receive data we use Input annotation
    @Input() public product:IProduct;
}
/*<div [ngStyle] = "{background:product.promoted ? 'yellow': 'white'}">
            <h2>{{product.name}}, Price:{{product.price}} pln</h2>
            <p>{{product.description}}</p>
            <p>Tags: {{product.tags}}</p>
        </div>*/