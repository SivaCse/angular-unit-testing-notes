import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Observable, Subscriber } from 'rxjs';

import { AppComponent } from './app.component';

import { TodoService } from './todo.service'
import { CommonService } from './common.service'
import { DebugElement } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs/observable/of';

class MockTodoService extends TodoService {
  getTodos(): Observable<any> {
    return Observable.of(['one', 'two']);
  }
  addTodo(todo) {
    console.log(todo);
  }
  returnValue(param) {
    return param + '!';
  }
}

class MockCommonService extends CommonService {
  getTodos(): Observable<any> {
    return Observable.of(['one', 'two']);
  }
  addTodo(todo) {
    console.log(todo);
  }
  returnValue(param) {
    return param + '!';
  }
  getLoader(){
    return Observable.of(true)
  }
}

class MockRouter {
  public ne = new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoService: TodoService;
  let commonService: CommonService;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{ provide: TodoService, useClass: MockTodoService },
        { provide: CommonService, useClass: MockCommonService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      todoService = TestBed.get(TodoService);
      commonService = TestBed.get(CommonService);
      router = TestBed.get(Router);
      fixture.detectChanges();
    })
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));


  it('todos should be defined and empty on first', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.todos).toBe(undefined);
  }));

  it('should inject TodoService', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const todoService = fixture.debugElement.injector.get(TodoService);
    expect(app['todoService']).toBeDefined();
    expect(app['todoService']).toBe(todoService);
  }));

  it('should inject TodoService', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const todoService = fixture.debugElement.injector.get(TodoService);
    expect(app['todoService']).toBeDefined();
    expect(app['todoService']).toBe(todoService);
  }));

  it('should TodoService be the same instance', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const todoService = fixture.debugElement.injector.get(TodoService);
    expect(todoService instanceof MockTodoService).toBeTruthy();
  }));

  it('todo should contain actual data after nginit', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.todos.length).toBe(2)
  }));

  it('callTest function should be called', () => {
    let callTestSpy = spyOn(component, 'callTest').and.callThrough();
    component.addTodo();
    expect(callTestSpy).toHaveBeenCalled();
  });

  it('addTodo service function should be called', () => {
    let spy = spyOn(todoService, 'addTodo').and.callThrough();
    component.addTodo();
    //expect(spy).toHaveBeenCalled();
    expect(spy.calls.any()).toEqual(true);
  });

  it('returnValue function should be work correctly', () => {
    let spy = spyOn(todoService, 'returnValue').and.returnValue('Hello!!');
    const returnedValue = todoService.returnValue('Hello');
    expect(returnedValue).toEqual('Hello!!');
  });

  it('it should throw Error if pass invalid', () => {
    let returnErrSpy = spyOn(component, 'returnErr').and.callThrough();
    expect(returnErrSpy).toThrowError()
  });

  it('it should not throw Error if pass valid', () => {
    expect(component.returnErr('Hello')).toBe(undefined)
  });

  it('it should call noName fun', () => {
    let Spy = spyOn(component, 'noNameProvided').and.callThrough();
    component.conditionalCall()
    expect(Spy).toHaveBeenCalled()
  });

  it('it should call sivaName fun', () => {
    let Spy1 = spyOn(component, 'sivaName').and.callThrough();
    let Spy2 = spyOn(component, 'noNameProvided').and.callThrough();
    component.conditionalCall('Siva')
    expect(Spy1).toHaveBeenCalled()
    expect(Spy2).not.toHaveBeenCalled()
  });

  it('it should call bharathiName fun', () => {
    let Spy1 = spyOn(component, 'bharathiName').and.callThrough();
    let Spy2 = spyOn(component, 'sivaName').and.callThrough();
    component.conditionalCall('Bharathi')
    expect(Spy1).toHaveBeenCalled()
    expect(Spy2).not.toHaveBeenCalled()
  });

  it('it should give value as Ram', () => {
    let button = fixture.debugElement.nativeElement.querySelector('input');
    let Spy = spyOn(component, 'inputClick').and.callThrough();
    button.click();
    expect(Spy).toHaveBeenCalledWith('Ram');
  });

  it('it should inject common service',async()=>{
    fixture.detectChanges();
    const commonService = fixture.debugElement.injector.get(CommonService);
    expect(component['commonService']).toBeDefined();
    expect(component['commonService']).toBe(commonService);
  })

  it('it should call router events subscribe fn', () => {
    let Spy = spyOn(router.events, 'subscribe').and.callThrough();
    let SpyComp = spyOn<any>(component, 'activateLoader').and.callThrough();
    fixture.detectChanges();
    component.ngOnInit();
    expect(Spy).toHaveBeenCalled();
    expect(SpyComp).toHaveBeenCalled();
  });

  it('it should call activateLoader fn', () => {
    let Spy = spyOn(commonService, 'setLoader').and.callThrough();
    let SpyComp = spyOn<any>(component, 'activateLoader').and.callThrough();
    expect(component['activateLoader']).toBeDefined();
    fixture.detectChanges();
    expect(component['activateLoader'](router.events[0])).toBe(undefined);
  });


  it('it should call ngDestroy fn', () => {
    let SpyComp = spyOn<any>(component.todoSubscription, 'unsubscribe').and.callThrough();
    fixture.detectChanges();
    component.ngDestroy();
    expect(component.flag).toBeTruthy()
    expect(SpyComp).toHaveBeenCalled();
  });

  it('it should not call unsubscribe in ngDestroy fn if flag false', () => {
    let SpyComp = spyOn<any>(component.todoSubscription, 'unsubscribe').and.callThrough();
    fixture.detectChanges();
    component.flag = false;
    component.ngDestroy();
    expect(component.flag).toBeFalsy();
    expect(SpyComp).not.toHaveBeenCalled();
  });

  it('it should call callTest from ngOnInit', async(() => {
    let SpyComp = spyOn<any>(component, 'callTest').and.callThrough();
    component.ngOnInit()
    expect(SpyComp).toHaveBeenCalled();
  }));

  it('loader var should be undefined initially', async(() => {
    expect(component.loader).not.toBe(Observable.of(true));
  }));

  it('done sample spec', (done) => {
    component.ngOnInit();
    commonService.getLoader().subscribe((data)=>{
      expect(data).toBe(true);
      done()
    })
  }); //

  it('loader var should be observable', () => {
    const testData = Observable.of(true);
    const spy = spyOn(commonService, 'getLoader').and.returnValue(
      testData
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.loader).toEqual(testData);
  }); //

});
