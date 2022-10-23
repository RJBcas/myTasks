import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { of } from 'rxjs';
import { TemplateModule } from 'src/app/template/template.module';
import { LIST_TASK_MOCK } from '../mocks/listTask.mock';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        TemplateModule,
        MatIconModule,
        Ng2SearchPipeModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    spyOn((component as any).apiEdit, 'getIdEdit').and.returnValue(of(1));
    spyOn((component as any).apiList, 'getDataList').and.returnValue(of(LIST_TASK_MOCK))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Edit Task ', () => {
    // component.apiList.setDataList(LIST_TASK_MOCK)
    // component.apiEdit.setIdEdit(1);
    // component.getlisData();
    // component.apiList.setDataList(LIST_TASK_MOCK)
    component.listTask = LIST_TASK_MOCK;
    component.createForm.get('title')?.setValue('Soy una tarea');
    component.createForm.get('tasks ')?.setValue([{
      task: 'limpiar',
      isComplete: true
    },
    {
      task: 'Cocinar',
      isComplete: true
    }])
    component.editTask();
    expect(component.listTask.data).toContain(component.editThisTask);
  })

  it('Remove task', () => {
    component.removeTask(0);
    expect(component.tasks.length).toEqual(0)
  })
  it('addTask', () => {
    let initialLengthTask = component.tasks.length
    component.addTask()
    expect(component.tasks.length).toEqual(initialLengthTask + 1);
  })
  it('gotTo List Tasks', () => {
    component.goToList();
    expect(component).toBeTruthy();

  })
  it('formaDate', () => {
    component.formatAMPM(new Date('2021-05-12T23:12:52.456Z'))
    component.formatAMPM(new Date('2021-05-12T23:02:02.456Z'))

    expect(component).toBeTruthy();

  })
  it('setForm', () => {

    component.editThisTask = LIST_TASK_MOCK.data[2];
    component.setFormData();
    expect(component).toBeTruthy();
  })

});
