import {Component, Injectable} from "@angular/core";

//As using decorator is the only way to force TypeScript to emit metadata, Angular has special decorator for services
@Injectable()
//8/ When ignoring decorator service is simple class with no influences from Angular
export class TodoRepository {

    public getTodos (): Object[] {
        return [
            {title: 'my first todo', done: false},
            {title: 'my second todo', done: true}
        ];
    }
}
