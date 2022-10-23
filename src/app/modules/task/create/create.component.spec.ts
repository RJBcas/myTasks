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
import { TemplateModule } from 'src/app/template/template.module';
import { LIST_TASK_MOCK } from '../mocks/listTask.mock';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
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
        MatCheckboxModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addTask', () => {
    let initialLengthTask = component.tasks.length
    component.addTask()
    expect(component.tasks.length).toEqual(initialLengthTask + 1);
  })
  it('create Task ', () => {
    let initialTasks = LIST_TASK_MOCK.data.length
    component.apiList.setDataList(LIST_TASK_MOCK)
    component.createTask();
    expect(component.listTask.data.length).toEqual(initialTasks + 1);
  })

  it('Remove task', () => {
    component.removeTask(0);
    expect(component.tasks.length).toEqual(0)
  })
  it('go to List', () => {
    component.goToList();
    expect(component).toBeTruthy();
  })
  it('formaDate', () => {
    component.formatAMPM(new Date('2021-05-12T23:12:52.456Z'))
    component.formatAMPM(new Date('2021-05-12T23:02:02.456Z'))

    expect(component).toBeTruthy();

  })

});
