import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedListComponent } from './routed-list.component';

describe('RoutedListComponent', () => {
  let component: RoutedListComponent;
  let fixture: ComponentFixture<RoutedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
