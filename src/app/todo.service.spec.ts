import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));

  it('should be defined getTodos fun', inject([TodoService], (service: TodoService) => {
    expect(service.getTodos).toBeDefined();
  }));

  it('getTodos should be return data', inject([TodoService], (service: TodoService) => {
    service.getTodos().subscribe((todos)=>{
      expect(todos.length).toBe(undefined);
    })
  }));

  it('addTodo should be return added data', inject([TodoService], (service: TodoService, done) => {
    const spy = spyOn(service.todoSubject, 'next').and.callThrough();
    service.addTodo('three');
    expect(spy).toHaveBeenCalledWith('three');
  }));
});
