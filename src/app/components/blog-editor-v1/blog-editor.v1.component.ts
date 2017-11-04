import {
    ChangeDetectorRef,
    Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, TemplateRef,
    ViewChild
} from '@angular/core';
import {BlogItem, BlogItemFactory} from '../../model/BlogItem';
import {ENTER} from '@angular/cdk/keycodes';
import {MarkdownService} from 'angular2-markdown';
import {BlogHttpService} from "../../services/blog-http/blog-http.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";


@Component({
    selector: 'app-blog-editor-v1',
    templateUrl: './blog-editor.v1.component.html',
    styleUrls: ['./blog-editor.v1.component.scss']
})
export class BlogEditorComponentV1 implements OnInit {


    private num = '\u2714';
    private blog = BlogItemFactory.instanceOf();
    @ViewChild('viewscreen') viewscreen: ElementRef;
    @Input() insertNotUpdate = false;

    @Input()
    set selectedBlog(blog: BlogItem) {

        this.blog = BlogItemFactory.clone(blog);
        this.transformMdToHtml(this.blog.content);
    }


    constructor(private markdown: MarkdownService,
                private rnd: Renderer2,
                private router: Router,
                private service: BlogHttpService,
                private acr: ActivatedRouteSnapshot,
                private cdr: ChangeDetectorRef) {
       console.log('Blog editor v1', this.acr);

    }

    ngOnInit() {
        const id = this.acr.queryParams['id']
        this.service.findBy(id);
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

    actionUpdate() {
        //this.update.emit(this.blog);
    }

    actionInsert(event: Event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        console.log('do insrt');
        // this.insert.emit(this.blog);
    }

    actionContentChanged(e) {
        console.log('action content changed ......', this.viewscreen, this.rnd);
        this.transformMdToHtml(e.target.value);
    }

    transformMdToHtml(mdStr: string) {
        const htmlStr = this.markdown.compile(mdStr);
        console.log('html', htmlStr);
        this.rnd.setProperty(this.viewscreen.nativeElement, 'innerHTML', htmlStr);
    }

    onSubscription(obs: Observable<any>) {
        const next: (a) => void =
            (itms: BlogItem[]) => {
                // this.blogs = itms;
                // this.switchStateListtateList();
            };

        obs.subscribe(next, (error: Error) => console.log('error has occurred', error.message));

    }

}
