import {Component, HostListener, Inject, Injectable, OnInit, TemplateRef, ViewChild} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {
    DialogPosition, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSidenav, MatSnackBar,
    MatSnackBarRef
} from '@angular/material';
import {BlogItem, BlogItemFactory} from "../../model/BlogItem";
import {BlogEditorComponent} from "../blog-editor/blog-editor.component";
import {BlogHttpService} from "../../services/blog-http/blog-http.service";
import {Params, Router} from "@angular/router";
import {AmsService} from "../../services/ams.service";
import {SnackbarService} from "../../materials/shared-services/snackbar.service";
import {Subject} from "rxjs/Subject";
import {
    query, trigger, style, transition, stagger, keyframes, animate, state, group,
    animateChild
} from "@angular/animations";

@Component({
    template: `
    <h1 mat-dailog-title>DELETE</h1>
    <p>'delete title' {{data.title}}? Y/n</p>
    <div mat-dialog-actons>
        <button mat-button  color="accent" [mat-dialog-close]="data">OK</button>
        <button mat-button  color="primary" (click)="dialogRef.close()">NO</button>
    </div>
    `,
    styleUrls: ['./blog-list.component.scss']
})
export class ConfirmDeleteDialog {
    constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any,) {
    }
}


@Component({
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.scss'],
    animations: [
        trigger('addRowTrigger', [

            state(':enter', style({opacity: 0})),
            transition(':enter', [

                style({
                    opacity: 1,
                    transform: 'translateY( -90%) rotate( 0deg) scaleY( 0.3)'
                }),
                animate(
                    '350ms cubic-bezier( 1, .5, 1, 1.5)',
                ),
            ])
        ])
    ]
})
export class BlogListComponent implements OnInit {
    blogs: BlogItem[];
    blogs$: Observable<BlogItem[]>;
    blog: BlogItem = BlogItemFactory.instanceOf();
    lft = 3;
    rht = 3;
    mid = 1;
    mid4 = 4;
    totalCols = 12;

    @ViewChild('tmpPopup') confirmDeleteTmpl: TemplateRef<any>;
    @ViewChild(BlogEditorComponent) editor: BlogEditorComponent;

    constructor(public blogDb: BlogHttpService,
                private ams: AmsService,
                private sbar: SnackbarService,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getblogs();
        this.debouncer
            .debounceTime(Date.now() + 550)
            // .do(console.log)
            .subscribe(a => {
                if (a.length > 0) {
                    this.blogs$ = this.blogDb.testout(a)
                } else {
                    this.blogs$ = this.blogDb.getListHandler()
                        .delay(new Date().getMilliseconds() + 50);
                }
            })
    }

    debouncer: Subject<string> = new Subject();

    getblogs() {
        this.blogs$ = this.blogDb.getListHandler()
            .do(console.log)
            .delay(new Date().getMilliseconds() + 20);

    }

    commit_delete(id: string) {
        const obsr = this.blogDb.delete(id);
        this.onSubscription(obsr);
    }

    onSearchClicked(ev) {
        console.log('search cliced', ev);
        this.debouncer.next(ev.target.value);
    }

    confirmDelete(itm: BlogItem) {
        const dp: DialogPosition = {top: "50%"};
        const dia = this.dialog.open(ConfirmDeleteDialog, {
            width: '250px',
            position: dp,
            data: {id: itm.id, title: itm.title}
        });

        dia.afterClosed().subscribe(result => {
            if (result) {
                this.commit_delete(result.id);
            }
        });
    }

    updateItemAction(itm) {
        const msgId = this.ams.send(itm);
        this.router.navigate(['./routedlist/editor'],
            {
                queryParams: {
                    type: 'UPDATE',
                    insertNotUpdate: false,
                    editState: 1,
                }
            });
    }

    viewItemAction(itm) {
        const msgId = this.ams.send(itm);
        this.router.navigate(['./routedlist/editor'],
            {
                queryParams: {
                    type: 'VIEW',
                    insertNotUpdate: false,
                    editState: 0,
                }
            });
    }

    addItemAction() {
        this.blog = BlogItemFactory.instanceOf();
        const msgId = this.ams.send(BlogItemFactory.instanceOf());
        this.router.navigate(['./routedlist/editor'],
            {
                queryParams: {
                    type: 'INSERT',
                    insertNotUpdate: true,
                    editState: 2,
                }
            });
    }

    onSubscription(obs: Observable<any>) {
        const next: (a) => void =
            (itms: BlogItem[]) => {
                this.blogs$ = Observable.of(itms);
                //console.log('item list after delete', itms, itms.length);
                this.sbar.open();

            };

        obs.subscribe(next, (error: Error) => console.log('error has occurred', error.message));
    }

    _itmSelected(itm: BlogItem) {
        this.editor.insertNotUpdate = false;
        this.blog = BlogItemFactory.clone(itm);
        // this.sidenav.close();
    }
}
