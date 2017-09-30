import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'promoted',
    pure: false
})
export class PromotedPipe implements PipeTransform {

    transform(items: any[]): any {
    	return items.filter(item => {
        	if(item.promoted == true){
           	return false;
        	}else{
            	return false
        	}
        });
    }
}