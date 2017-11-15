import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BlogItem} from '../../model/BlogItem';
import {Subject} from "rxjs/Subject";
import {Subscriber} from "rxjs/Subscriber";
import {AmsService} from "../ams.service";
import {BlogItemCallbackVo} from "../../components/blog-editor/blog-editor.component";
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';

import {isNullOrUndefined} from "util";
// import {BlogItem} from '../../model/BlogItem';

const base = 'http://localhost:8080/';

export interface DbEventable {
    update: EventEmitter<any>;
    insert: EventEmitter<any>;
    delete: EventEmitter<any>;
}

@Injectable()
export class BlogHttpService {

    private blogSubject: Subject<Object> = new Subject();
    private subscribers: Map<DbEventable, Subscriber<DbEventable>> = new Map();

    urls: Map<string, string> = new Map(
        [
            ['listAll', base.concat('blogs')],
            ['findOne', base.concat('blog/')],
            ['DEL', base.concat('blog/')],
            ['INS_UPD', base.concat('blog')],

        ]
    );

    constructor(@Inject(HttpClient) private BlogHttp: HttpClient, private ams: AmsService) {
    }

    public registerObservable(obs: DbEventable) {
        const subs = obs.insert.subscribe(a => this.insert(a));

        const subsUpd = obs.update.subscribe(a => {
            this.update(a).subscribe(console.log);
        });
    }

    public deregister(obs: DbEventable) {
        if (this.subscribers.has(obs)) {
            this.subscribers.get(obs).unsubscribe();
            this.subscribers.delete(obs);
        }
    }

    getListHandler(): Observable<any> {
        const url = this.urls.get('listAll');

        // this.blogSubject.subscribe(b => console.log('subject subs:', b));

        this.BlogHttp.get(url)
            .subscribe(a => {
                this.blogSubject.next(a)
            });
        return this.blogSubject;

    }


    listAll(): any {
        const url = this.urls.get('listAll');

        // this.blogSubject.subscribe(b => console.log('subject subs:', b));

        this.BlogHttp.get(url)
            .subscribe(a => this.blogSubject.next(a));
        return this.BlogHttp.get(url).mergeMap(a => Observable.of(a));

    }

    update(itm: BlogItem) {
        const url = this.urls.get('INS_UPD');
        console.log('updateing', itm);
        return this.BlogHttp.put(url, itm);

    }

    delete(id: string): Observable<Object> {
        const url = this.urls.get('DEL');
        return this.BlogHttp.delete(url.concat(`${id}`))

    }

    insert(itm: BlogItem) {
        delete itm.id;
        const url = this.urls.get('INS_UPD');
        return this.BlogHttp.post(url, itm);

    }

    findById(id: string): Observable<Object> {
        const url = this.urls.get('findOne').concat(id);
        return this.BlogHttp.get(url)
            .do(a => console.log('data returned', a));
    }

    testout(value:String): Observable<BlogItem[]>{
        console.log('testout fired', value);
        if(isNullOrUndefined(value)) {
            value = 'Brewers'
        }
       return this.BlogHttp.post<BlogItem[]>("http://localhost:8080/qtest/" + value,{title:value})
    }


}
