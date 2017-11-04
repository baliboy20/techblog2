import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BlogItem} from '../../model/BlogItem';
// import {BlogItem} from '../../model/BlogItem';

const base = 'http://localhost:8080/';


@Injectable()
export class BlogHttpService {

    urls: Map<string, string> = new Map(
        [
            ['listAll', base.concat('blogs')],
            ['findOne', base.concat('blog/')],
            ['DEL', base.concat('blog/')],
            ['INS_UPD', base.concat('blog')],

        ]
    );

    constructor(@Inject(HttpClient) private BlogHttp: HttpClient) {
    }

    mock(): string {
        return 'istrue';
    }

    listAll(): any {
        const url = this.urls.get('listAll');
        return this.BlogHttp.get(url)
            .do(a => console.log('data returned', a));
    }

    update(itm: BlogItem): Observable<Object> {
        const url = this.urls.get('INS_UPD');
        return this.BlogHttp.put(url, itm);
    }

    delete(id: string): Observable<Object> {
        const url = this.urls.get('DEL');
        return this.BlogHttp.delete(url.concat(`${id}`));
    }

    insert(itm: BlogItem): Observable<Object> {
        delete itm.id;
        const url = this.urls.get('INS_UPD');
        console.log('url ====>', url);
        return this.BlogHttp.post(url, itm)
            .do(a => console.log('data returned', a));
    }

    findById(id: string): Observable<Object> {
        const url = this.urls.get('findOne').concat(id);
        return this.BlogHttp.get(url)
            .do(a => console.log('data returned', a));
    }

}
