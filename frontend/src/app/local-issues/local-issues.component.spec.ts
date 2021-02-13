import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalIssuesComponent } from './local-issues.component';

describe('LocalIssuesComponent', () => {
  let component: LocalIssuesComponent;
  let fixture: ComponentFixture<LocalIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
