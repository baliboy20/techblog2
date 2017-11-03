import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {BlogItem} from '../model/BlogItem';
import {map} from 'rxjs/operator/map';

'';

@Injectable()
export class MyHttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.body) {
    //
    //   const body: string = req.body.title = req.body.title + '_changed'; //
    //   const changed = {title: 'changed', content: 'changed'};
    //   console.log('inside the interceptor....', req.detectContentTypeHeader());
    //   const dupe = req.clone({body: req.body});
    //   return next.handle(dupe);
    // } else {
    //   return next.handle(req);
    // }
    return next.handle(req)
      .do( (a: HttpEvent<BlogItem[]>) => {
        const b: BlogItem[] = (a as HttpResponse<BlogItem[]>).body;
        if (!b) { return; }
          // b.forEach( bi => bi.title = 'x'.concat(bi.title));
        // console.log('b ====>', b, );

      });

    // .map( (a: any[]) => {
    //   a.forEach(b => b.title += 'responded' );
    //   return a;
    // });


  }

  constructor() {
  }

}
