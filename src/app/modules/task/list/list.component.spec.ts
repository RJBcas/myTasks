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
import { take } from 'rxjs';
import { TemplateModule } from 'src/app/template/template.module';
import { LIST_TASK_MOCK } from '../mocks/listTask.mock';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('showSearch', () => {
    component.showSearchFn();
    expect(component.showSearch).toBeTrue();
  })
  it('Navigate addTask', () => {
    component.addTask();
    expect(component).toBeTruthy();
  })
  it('editTask', () => {
    component.editTask(1);
    component.apiEdit.getIdEdit().pipe(take(1)).subscribe(res => {
      expect(res).toEqual(1);
    });
  })

  it('deleteTask', () => {
    component.dataPayload = LIST_TASK_MOCK
    let lengthTasks = component.dataPayload.data.length;
    component.deleteTask(1);
    expect(component.dataPayload.data.length).toEqual(lengthTasks - 1)
  })
});
