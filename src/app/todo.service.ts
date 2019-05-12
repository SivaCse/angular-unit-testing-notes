import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TodoService {
  todoSubject:BehaviorSubject<any>;
  todoObservable:Observable<any>;

  constructor() {
    this.todoSubject = new BehaviorSubject(1);
    this.todoSubject.next(2);
    this.todoSubject.next(3);
    this.todoSubject.asObservable().subscribe((data)=> console.log(data,'data'))
   }

  getTodos(): Observable<any> {
    return  this.todoSubject.asObservable();
  }

  addTodo(todo){
    this.todoSubject.next(todo);
  }

  returnValue(param){
    return param+'!';
  }


}
