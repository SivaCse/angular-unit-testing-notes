import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs'

import { TodoService } from './todo.service';

import { CommonService } from './common.service'


import {
  NavigationStart,
  NavigationEnd,
  Event,
  Router
} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  todos:any;
  todosAsync:any;
  todoSubscription:Subscription;
  flag:boolean;
  loader:Observable<boolean>;
  constructor(private todoService: TodoService, 
    private commonService: CommonService,
    private router: Router){
    this.todosAsync = this.todoService.getTodos();
  }

  ngOnInit(){
    this.todoSubscription = this.todoService.getTodos().subscribe((data)=>{
      this.todos = data;
      console.log(data,'data')
    })
    this.todosAsync = this.todoService.getTodos();

    this.router.events.subscribe((event: Event) => {
      this.activateLoader(event);
    });

    this.callTest();

    this.flag = true;

    this.loader = this.commonService.getLoader();


  }

  addTodo(){
    this.todoService.addTodo(Math.random());
    this.callTest()
  }

  ngOnDestroy(){
    this.todoSubscription.unsubscribe();
  }

  callTest(){
    console.log('data')
  }

  returnErr(name?:any){
    if(!name) {
      throw Error('Name must')
    }
  }

  conditionalCall(name?:any){
    if(!name) {
      this.noNameProvided()
    }
    if(name){
      if(name === 'Siva'){
        this.sivaName()
      } else {
        this.bharathiName()
      }
    }
  }

  noNameProvided() {

  }

  sivaName() {

  }

  bharathiName(){

  }

  inputClick(value){
    alert(value)
  }


  private activateLoader(event: Event) {
    if (event instanceof NavigationStart) {
      this.commonService.setLoader(true);
    }
    if (event instanceof NavigationEnd) {
      this.commonService.setLoader(false);
    }
  }

  ngDestroy(){
    if(this.flag){
      this.todoSubscription.unsubscribe();
    }
  }



}
