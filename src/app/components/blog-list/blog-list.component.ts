
import {Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSidenav} from '@angular/material';
import {BlogItem, BlogItemFactory} from "../../model/BlogItem";
import {BlogEditorComponent} from "../blog-editor/blog-editor.component";
import {BlogHttpService} from "../../services/blog-http/blog-http.service";






@Component({
    template: `
    <h1 mat-dailog-title>DELETE</h1>
    <p>'delete title' {{data.title}}? Y/n</p>
    <div mat-dialog-actons>
    <button mat-button (click)="dialogRef.close()">NO</button>
    <button mat-button [mat-dialog-close]="data">SURE</button>
</div>
    `
})
export class ConfirmDeleteDialog {
    constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any,) { }
}




@Component({
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

    blogs: BlogItem[];
    blog: BlogItem = BlogItemFactory.instanceOf();


    @ViewChild(BlogEditorComponent) editor: BlogEditorComponent;

    constructor(public blogDb: BlogHttpService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getblogs();

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

    }

    switchStateList() {
        // this.sidenav.open();
    }

    confirmDelete(itm: BlogItem){
        const dia =  this.dialog.open(ConfirmDeleteDialog, {
            width: '250px',
            data: {id: itm.id, title: itm.title}
        });

        dia.afterClosed().subscribe(result => {
            if(result) {
                this.commit_delete(result.id);
            }
        });
    }

    addItemAction() {
        this.editor.insertNotUpdate = true;
        this.blog = BlogItemFactory.instanceOf();
        // this.sidenav.close();
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
        // this.sidenav.close();
    }


}
