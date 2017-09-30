import {Component, Input} from '@angular/core';

export interface IProduct{
      name: string,
      price:number,
      description:string,
      promoted: boolean,
      tags: string
}

@Component({
    selector: 'product',
    template: `
        <div [ngStyle] = "{background:product.promoted ? 'yellow': 'white'}">
            <h2>{{product.name}}, Price:{{product.price}} pln</h2>
      	    <p>{{product.description}}</p>
      	    <p>Tags: {{product.tags}}</p>
        </div>
    `
})
export class ProductComponent {
    // To receive data we use Input annotation
    @Input() public product:IProduct;
}
