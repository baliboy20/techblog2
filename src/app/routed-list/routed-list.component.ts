import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

// export const routerTransition = trigger('routerTransition', [
//     transition('* <=> *', [
//         /* order */
//         /* 1 */ query(':enter, :leave', style({ position: 'fixed', width:'100%' })
//             , { optional: true }),
//         /* 2 */ group([  // block executes in parallel
//             query(':enter', [
//                 style({ transform: 'translateX(100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }
//             ], { optional: true }),
//         ])
//     ])
// ])

@Component({
  selector: 'app-routed-list',
  templateUrl: './routed-list.component.html',
  styleUrls: ['./routed-list.component.scss'],
    animations: [
        trigger('aniRoutes', [
            transition('* <=> *', [
                group([
                    query(
                        ':enter',
                        [
                            style({
                                opacity: 0,
                                transform: 'translateX(-59%) rotate(0deg)'
                            }),
                            animate(
                                  '500ms  cubic-bezier(0, 1, 1, 1)',
                                style({ opacity: 1 })
                            ),
                            animateChild()
                        ],
                        { optional: true }
                    ),
                    query(
                        ':leave',
                        [animate('500ms', style({ opacity: 0 })), animateChild()],
                        { optional: true }
                    )
                ])
            ])
        ])
    ]
})
export class RoutedListComponent implements OnInit {

  constructor() {

  }
    getPage(outlet: RouterOutlet) {

        const a =  outlet.isActivated ? outlet.activatedRoute : '';
        return a;
    }

    animationStarted(event) {
        //console.log('Animation started:', event);
    }
  ngOnInit() {
  }

}
