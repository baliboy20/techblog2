import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {BlogItem, BlogItemFactory} from './model/BlogItem';
import {BlogEditorComponent} from './components/blog-editor/blog-editor.component';

const path = 'blog-blogDb://localhost:8080/blog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(BlogEditorComponent) editor: BlogEditorComponent;
  title = 'app';
  sb: MatSnackBar;
  blog: BlogItem = new BlogItem();
  newBlog: BlogItem = new BlogItem();
  blogs: BlogItem[] = [];
  selectedId = 0;

  constructor(public http: HttpClient, public snackbar: MatSnackBar) {
    this.sb = snackbar;
    console.log('Snack Bar', this.sb);
  }

  doAdd() {
    this.http.post(path,
      this.newBlog)
      .subscribe(resp => {
        this.newBlog = new BlogItem();
        this.blogs = resp as BlogItem[];
      }, this.httpErrorCallback);
  }

  doInsert_v1(newItem: BlogItem) {
    console.log('INSERT', newItem);
    delete newItem.id;
    this.http.post(path,
      newItem)
      .subscribe(resp => {
        this.newBlog = new BlogItem();
        this.blogs = resp as BlogItem[];
      }, this.httpErrorCallback);
  }

  doDelete(id: BlogItem) {
    // this.subsribe();
    this.http.delete(path.concat(`/${id}`))
      .subscribe(resp => {
        this.blogs = resp as BlogItem[];
      }, this.httpErrorCallback);
  }

  doListOne() {
    console.log('sbbbb', this.sb);

    this.http.get<any>(path + '/333')
      .subscribe(this.httpResponseCallback, console.log);

  }

  doListAll() {
    this.http.get(path + 's')
      .subscribe((blogs: BlogItem[]) => {
        console.log('do Listall', blogs);
        this.blogs = blogs;
      }, this.httpErrorCallback);

  }

  doUpdate() {
    const id = 100;
    console.log(this.blog);
    this.http.put<BlogItem[]>(path, this.blog)
      .subscribe(resp => {
        this.blogs = resp as BlogItem[];
        this.sb.open('update completed', 'Close');
      }, this.httpErrorCallback);

  }

  doUpdate_v1(item: BlogItem) {
    const id = 100;
    console.log(item);
    this.http.put<BlogItem[]>(path, item)
      .subscribe(resp => {
        this.blogs = resp as BlogItem[];
        this.sb.open('update completed', 'Close');
      }, this.httpErrorCallback);

  }

  select(i: number) {
    this.blog = this.blogs[i];
    console.log('instance status:', this.blog);
    this.editor.selectedBlog = this.blog === null ? BlogItemFactory.instanceOf() : BlogItemFactory.clone(this.blog);
  }

  doAddTag() {
    if (!this.blog.tags) {
      this.blog.tags = [];
    }
    this.blog.tags.push('Tag' + this.blog.tags.length);
  }

  doSearch(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    console.log('keyup', value);

    this.http.post<BlogItem[]>(path.concat(`s/search`), {title: value})
      .subscribe(a => {
        this.blogs = a;
      }, this.httpErrorCallback);
    (event.target as HTMLInputElement).value = '';
    return;
  }

  onSearchClicked(event: MouseEvent) {
    console.log('clicked', event.target);
  }

  httpResponseCallback: (a: BlogItem) => void = (msg: BlogItem) => {
    console.log(msg);
    this.sb.open(msg.title, 'close', {duration: 0}
    );
  }

  httpErrorCallback: (err: string) => void = (err: any) => {
    this.sb.open(
      err.message, 'Close',
      {duration: 0});
    console.log(err);
  }
}
