import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {BlogHttpService} from '../services/blog-http/blog-http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {BlogItem, BlogItemFactory} from '../model/BlogItem';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {MatSidenav} from '@angular/material';
import {BlogEditorComponent} from '../components/blog-editor/blog-editor.component';

@Component({
    selector: 'app-side-list',
    templateUrl: './side-list.component.html',
    styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit {

    blogs: BlogItem[];
    blog: BlogItem = BlogItemFactory.instanceOf();

    @ViewChild(MatSidenav) sidenav: MatSidenav;
    @ViewChild(BlogEditorComponent) editor: BlogEditorComponent;

    constructor(public blogDb: BlogHttpService) {
    }

    ngOnInit() {
        this.getblogs();
        this.sidenav.open();
    }

    getblogs() {
        const call = this.blogDb.listAll();
        this.onSubscription(call);
    }

    commit_update(itm: BlogItem) {
        const call = this.blogDb.update(itm);
        this.onSubscription(call);
    }

    commit_insert(itm: BlogItem) {
        const call = this.blogDb.insert(itm);
        this.onSubscription(call);
    }

    commit_delete(id: string) {
        const obsr = this.blogDb.delete(id);
        this.onSubscription(obsr);
    }

    switchStateEdit(itm) {
        this.editor.insertNotUpdate = false;
        this.blog = BlogItemFactory.clone(itm);
        this.sidenav.close();
    }

    switchStateList() {
        this.sidenav.open();
    }

    addItemAction() {
        this.editor.insertNotUpdate = true;
        this.blog = BlogItemFactory.instanceOf();
        this.sidenav.close();
    }

    onSubscription(obs: Observable<any>) {
        const next: (a) => void =
            (itms: BlogItem[]) => {
                this.blogs = itms;
                this.switchStateList();
            };

        obs.subscribe(next, (error: Error) => console.log('error has occurred', error.message));

    }

    _itmSelected(itm: BlogItem) {
        this.editor.insertNotUpdate = false;
        this.blog = BlogItemFactory.clone(itm);
        this.sidenav.close();
    }

}