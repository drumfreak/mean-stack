import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileEditComponent } from './userprofile-edit.component';

describe('UserprofileEditComponent', () => {
  let component: UserprofileEditComponent;
  let fixture: ComponentFixture<UserprofileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
