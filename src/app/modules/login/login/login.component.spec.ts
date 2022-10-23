import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [

      ],
      imports: [
        MatCardModule,
        MatGridListModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testin LoginFuncion successes', () => {
    const location: Location = TestBed.inject(Location);
    component.loginForm.get('userName')?.setValue('testing@testing.com')
    component.loginForm.get('password')?.setValue('123456789Qa');
    component.login();
    // spyOn(component.rout, 'navigate').and.returnValue(true);
    expect(location.path()).toBe('');
  })

  it('Testin LoginFuncion bad Login', () => {
    const location: Location = TestBed.inject(Location);
    component.loginForm.get('userName')?.setValue('testing@testing.com')
    component.loginForm.get('password')?.setValue('12345QWSaw');
    component.login();
    // spyOn(component.rout, 'navigate').and.returnValue(true);
    expect(location.path()).toBe('');

  })

  it('no FormControl userName', () => {
    component.loginForm.removeControl('userName')
    component.login();
    expect(component).toBeTruthy();

  })
  it('no FormControl password', () => {
    component.loginForm.get('userName')?.setValue('testing@testing.com')
    component.loginForm.removeControl('password')
    component.login();
    expect(component).toBeTruthy();

  })
});
