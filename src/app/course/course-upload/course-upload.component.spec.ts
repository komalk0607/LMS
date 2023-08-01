import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUploadComponent } from './course-upload.component';

describe('CourseUploadComponent', () => {
  let component: CourseUploadComponent;
  let fixture: ComponentFixture<CourseUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseUploadComponent]
    });
    fixture = TestBed.createComponent(CourseUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
