import {Component, OnInit} from '@angular/core';
import {BlogItem} from "../model/BlogItem";

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

    constructor() {
    }

    title="hello dolly, this is my song";
    blogs: BlogItem[];

    ngOnInit() {
    }

    doListAll(ev) {
    }

    onSearchClick(e) {
    }

    onSearchClicked(e) {
    }

    doSearch(e) {
    }
    onClickd() {
        console.log('clicked');
    }

}
