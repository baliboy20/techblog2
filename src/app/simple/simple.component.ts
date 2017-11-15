import {Component, OnInit} from '@angular/core';
import {BlogItem} from "../model/BlogItem";
import {BlogHttpService} from "../services/blog-http/blog-http.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {isNullOrUndefined} from "util";
import {Subject} from "rxjs/Subject";
@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

    constructor(private service: BlogHttpService) {
    }

    title="hello dolly, this is my song";
    searchStr = "";
    blogs: BlogItem[];



    ngOnInit() {


        this.debouncer.debounceTime(200) .do(console.log)
            .filter(val => val.length !== 0)
            .subscribe(a => {
                this.service.testout(this.searchStr)
                    .subscribe(c => this.blogs = c)
            })

    }

    debouncer: Subject<string> = new Subject();
    doListAll(ev) {
        this.debouncer.next(ev.target.value);

    }

    onSearchClick(e) {
    }

    onSearchClicked(e) {
    }

    doSearch(e) {
        this.doListAll(e);
    }
    onClickd() {
        console.log('clicked');
    }

}
