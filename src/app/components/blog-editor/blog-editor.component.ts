import {
    ChangeDetectorRef,
    Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {BlogItem, BlogItemFactory} from '../../model/BlogItem';
import {MarkdownService} from 'angular2-markdown';
import {AmsService} from "../../services/ams.service";
import 'rxjs/add/operator/last';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import {ISubscription, Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogHttpService, DbEventable} from "../../services/blog-http/blog-http.service";
import {isNullOrUndefined} from "util";
import {SnackbarService} from "../../materials/shared-services/snackbar.service";

export interface BlogItemCallbackVo {
    data: BlogItem | BlogItem[];
    callback: (a: any) => Observable<any>;
}

enum enum_editStates {EDIT = 1, VIEW = 0, INSERT = 2};

@Component({
    selector: 'app-blog-editor',
    templateUrl: './blog-editor.component.html',
    styleUrls: ['./blog-editor.component.scss'],
    providers: [SnackbarService],
})
export class BlogEditorComponent implements OnInit {


    private blog = BlogItemFactory.instanceOf();
    private dirty = false;
    private editorInFocus = false;
    @ViewChild('viewscreen') viewscreen: ElementRef;
    @Input() insertNotUpdate = false;
    _editState: 0 | 1 | 2 = 2;
    _dirty = false;
    tabIdx = 0;

    @Input()
    set selectedBlog(blog: BlogItem) {
        this.blog = BlogItemFactory.clone(blog);
        this.transformMdToHtml(this.blog.content);
    }

    private msger: Subscription;

    constructor(private markdown: MarkdownService,
                private ams: AmsService,
                private sbar: SnackbarService,
                private rnd: Renderer2,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private blogDb: BlogHttpService,
                private cdr: ChangeDetectorRef) {
        console.log('Snack service', this.sbar);
    }

    ngOnInit() {
        this.msger = this.ams.listen()
            .subscribe(a => {
                this.blog = a.data !== null ? a.data : BlogItemFactory.instanceOf();
                this.transformMdToHtml(this.blog.content);
            });

        this.activatedRoute.queryParams.subscribe(a => {
            this.insertNotUpdate = JSON.parse(a.insertNotUpdate);
            this._editState = a.editState;
        });
    }

    onEditorFocus(value: boolean, event: Event) {
        event.stopImmediatePropagation();
        const flag: boolean = value;
        this.editorInFocus = flag;
        this.sbar.openWithMsg('editor focus event firedz');
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.msger.unsubscribe();
    }

    doAddTag(event: { input: HTMLInputElement, value: any }) {

        if (event.value.length === 0) {
            return;
        }

        if (!this.blog.tags) {
            this.blog.tags = [];
        }
        this.blog.tags.push(event.value);
        event.input.value = '';
    }

    doRemoveTag(tagIdx: number): void {
        this.blog.tags.splice(tagIdx, 1);
        console.log(this.blog.tags);
    }


    actionExitList() {
        this.router.navigate(['routedlist', 'list']);
    }

    actionInsert(event: Event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        this.blogDb.insert(this.blog).subscribe(a => this._callback(a, this.sbar));
    }

    actionUpdate(event: Event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        console.log('act upd:', this.blog);
        this.blogDb.update(this.blog)
            .subscribe(a => this._callback(a, this.sbar));

        // this.update.emit({data: this.blog, callback: callback});
    }


    actionContentChanged(e) {
        this.blog.content = e.target.value;
        this.transformMdToHtml(e.target.value);
    }

    transformMdToHtml(mdStr: string) {
        const str = isNullOrUndefined(mdStr) ? '' : mdStr;
        const htmlStr = this.markdown.compile(str);
        this.rnd.setProperty(this.viewscreen.nativeElement, 'innerHTML', htmlStr);
    }

    _backendUpdate(a) {
        // const bl: BlogItemCallbackVo = {data: this.blog, callback: this._callback}
        // this.blogDb.update().subscribe(this._callback(a));
    }

    _callback(a, sb: SnackbarService) {
        sb.open()
    }
}
