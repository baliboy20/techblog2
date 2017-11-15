import {Component, OnInit} from '@angular/core';
import {animate, animateChild, group, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-ani',
    templateUrl: './ani.component.html',
    styleUrls: ['./ani.component.scss'],
    animations: [
        trigger('aniRoutes', [
            state(':enter', style({opacity:0})),
            transition(':enter', [

                style({
                    opacity: 1,
                    transform: 'translateY(50%) rotate(0deg) scale(.3)'
                }),
                animate(
                    '1250ms cubic-bezier(1, .5, .1, .05)',
                    // style({border:'dotted 1px darkgreen'})
                ),



            ])
        ])
    ]
})
export class AniComponent implements OnInit {

    constructor() {

    }

    data = [1, 2, 3, 4, 5];

    stream: Subject<number> = new Subject();

    reset() {
        this.data = [];
        Observable.interval(10)
            .map(a => a + 1)
            .take(17)
            .subscribe(t => {
                console.log(t);
                this.data.push(t)
            })
    }

    ngOnInit() {
        // console.clear();
        console.log('munti munti');
    }

    animationStarted(event?: any) {
        // console.log('animation strarted in Ani', event);
    }
}
