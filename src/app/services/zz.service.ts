import { Injectable } from '@angular/core';
import {BlogHttpService} from "./blog-http/blog-http.service";

@Injectable()
export class ZzService {
    public testValue: number =0
  constructor() {
    this.testValue =   Math.trunc(Math.random() * 1000) ;
      console.log('CONSTRUCTOR ZzService', this.testValue);

  }


}

export const ZzFactoryService= (service: BlogHttpService) => {
    service.findByTitle('Hello')
        .subscribe(a => console.log("hello", a));
    console.log('Running Factory Service !!!');
   return  new ZzService( )
};
