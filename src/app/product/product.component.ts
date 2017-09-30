import {Component, Input} from '@angular/core';


@Component({
    selector: 'product',
    template: `
        <div [ngStyle] = "{background:product.promoted ? 'yellow': 'white'}">
            <h2>{{product.name}}, Price:{{product.price}} pln</h2>
      	    <p>{{product.description}}</p>
        </div>
    `
})
export class ProductComponent {
    // To receive data we use Input annotation
    @Input() public product;
}
