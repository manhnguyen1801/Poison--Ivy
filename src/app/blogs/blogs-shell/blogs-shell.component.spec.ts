import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsShellComponent } from './blogs-shell.component';

describe('BlogsShellComponent', () => {
  let component: BlogsShellComponent;
  let fixture: ComponentFixture<BlogsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
