import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsidebarComponent } from './psidebar.component';

describe('PsidebarComponent', () => {
  let component: PsidebarComponent;
  let fixture: ComponentFixture<PsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
