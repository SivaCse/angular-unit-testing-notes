import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { TodoService } from './todo.service'

import { CommonService } from './common.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TodoService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
