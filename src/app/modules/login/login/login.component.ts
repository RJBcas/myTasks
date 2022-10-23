import {
  Component, OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { IApiLoginRes } from 'src/app/services/interfaces/apiLogin.interfaces';
import { LoginService } from 'src/app/services/login/login.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  constructor(public fb: FormBuilder,
    public apiLogin: LoginService,
    public rout: Router,
    public modal: ModalService) {
    this.loginForm = this.fb.group({

      userName: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
      ])]

    })

  }

  ngOnInit(): void {

  }

  login() {
    // this.apiLogin.apiLogin(this.loginForm.getRawValue());
    // acept login
    if (this.loginForm.get('userName')?.value === 'testing@testing.com' &&
      this.loginForm.get('password')?.value === '123456789Qa') {
      this.apiLogin.setDataLogin({ login: true })
    } else {
      this.apiLogin.setDataLogin({ login: false });
      this.modal.setShowModal(true);
      this.modal.setDataModal({
        title: 'Inicio de sesión Fallida',
        description: 'Correo o contraseña erronea!!!',
        class: 'error'

      })
    }
    this.apiLogin.getDataLogin().pipe(take(1), filter((res) => res.login !== undefined)).subscribe((resLogin: IApiLoginRes) => {
      if (resLogin.login) {
        this.apiLogin.setIsLogin(true);
        this.rout.navigate(['task'])
      }
    }

    )
  }
}


