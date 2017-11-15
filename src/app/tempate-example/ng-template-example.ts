import {Component} from "@angular/core";

@Component({
    selector: 'ng-template-outlet-example',
    template: `
    <ng-container *ngTemplateOutlet="greet"></ng-container>
    <hr>
    <ng-container *ngTemplateOutlet="eng; context: myContext"></ng-container>
    <hr>
    <ng-container *ngTemplateOutlet="svk; context: myContext"></ng-container>
    <hr>
    <ng-container *ngTemplateOutlet="tmplBlog; context: {blog1: {title: 'tits'}}"></ng-container>
    
    <ng-template #greet><span>Hello</span></ng-template>
    <ng-template #eng let-name><span>Hello {{name}}!</span></ng-template>
    <ng-template #svk let-person="localSk"><span>Ahoj {{person}}!</span></ng-template>
    <ng-template #tmplBlog let-blog="blog1"><span>title {{blog.title}}!</span></ng-template>
`
})
export class NgTemplateOutletExample {
    data = {title:'mytitle', content: 'nycontent'};
    myContext = {$implicit: 'Worldy', localSk: 'Svet', blog: this.data};
}