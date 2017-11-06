import {Component, Inject, OnInit} from '@angular/core';
import {ZzFactoryService, ZzService} from "../services/zz.service";
import {BlogHttpService} from "../services/blog-http/blog-http.service";

@Component({
    selector: 'app-routed-list',
    templateUrl: './routed-list.component.html',
    styleUrls: ['./routed-list.component.scss'],

})
export class RoutedListComponent implements OnInit {

    constructor(public zz: ZzService) {
    }

    value;

    ngOnInit() {
        console.log('ngOnInit', this.zz);
        this.value = this.zz.testValue;
    }

}
