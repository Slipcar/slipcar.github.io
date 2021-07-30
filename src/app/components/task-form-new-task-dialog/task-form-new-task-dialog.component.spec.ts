import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormNewTaskDialogComponent } from './task-form-new-task-dialog.component';

describe('TaskFormNewTaskDialogComponent', () => {
  let component: TaskFormNewTaskDialogComponent;
  let fixture: ComponentFixture<TaskFormNewTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormNewTaskDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormNewTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
