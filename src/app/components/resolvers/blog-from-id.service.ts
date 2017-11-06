import {Inject, Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BlogItem} from "../../model/BlogItem";
import {BlogHttpService} from "../../services/blog-http/blog-http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BlogFromIdService implements Resolve<any> {

    constructor(@Inject(BlogHttpService) public service: BlogHttpService) {
    }

    // resolve(route: ActivatedRoute) {
    //     const id = route.queryParams['id'];
    //     return this.service.findById( id);
    // }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.id;

        console.log( "RESOVER RESOLVER RESOLVER", id);


        return this.service.findById( id );
    }

}
