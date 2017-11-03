import {
    ChangeDetectorRef,
    Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, TemplateRef,
    ViewChild
} from '@angular/core';
import {BlogItem, BlogItemFactory} from '../../model/BlogItem';
import {ENTER} from '@angular/cdk/keycodes';
import {MarkdownService} from 'angular2-markdown';


@Component({
    selector: 'app-blog-editor',
    templateUrl: './blog-editor.component.html',
    styleUrls: ['./blog-editor.component.scss']
})
export class BlogEditorComponent implements OnInit {

    private num = '\u2714';
    private blog = BlogItemFactory.instanceOf();
    @ViewChild('viewscreen') viewscreen: ElementRef;
    @Input() insertNotUpdate = false;

    @Input()
    set selectedBlog(blog: BlogItem) {

        this.blog = BlogItemFactory.clone(blog);
        this.transformMdToHtml(this.blog.content);
    }

    @Output() insert: EventEmitter<BlogItem> = new EventEmitter();
    @Output() delete: EventEmitter<BlogItem> = new EventEmitter();
    @Output() update: EventEmitter<BlogItem> = new EventEmitter();
    @Output() cancel: EventEmitter<BlogItem> = new EventEmitter();

    constructor(private markdown: MarkdownService,
                private rnd: Renderer2,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
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
        this.update.emit(this.blog);
    }

    actionInsert(event: Event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        console.log('do insrt');
        this.insert.emit(this.blog);
    }

    actionContentChanged(e) {
        console.log('action content changed ......', this.viewscreen, this.rnd);
        this.transformMdToHtml(e.target.value);
    }

    transformMdToHtml(mdStr: string) {
        const htmlStr  = this.markdown.compile(mdStr);
        console.log('html', htmlStr);
        this.rnd.setProperty(this.viewscreen.nativeElement,'innerHTML', htmlStr);
    }
}
