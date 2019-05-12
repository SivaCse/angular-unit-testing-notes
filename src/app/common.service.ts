import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class CommonService {

  constructor() { }

  setLoader(flag){

  }
  
  getLoader(){
    return Observable.of(true)
  }

}
