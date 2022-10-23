import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { IApiLoginReq, IApiLoginRes } from '../interfaces/apiLogin.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private dataLogin = new BehaviorSubject <IApiLoginRes> ({} as IApiLoginRes);

  private isLogin :boolean = false;

  apiLogin(data: IApiLoginReq) {
    const headerDirect = {
      'Content-Type': 'application/json'
    }
    const requestOption = {
      headers: new HttpHeaders(headerDirect)
    }

    this.http.post<{}>(environment.urlApiLogin, data, requestOption)
      .pipe(
        catchError(this.handleError)
      ).subscribe((responseApiLogin: any) => {
        this.setDataLogin(responseApiLogin)

      })

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getDataLogin() {
    return this.dataLogin.asObservable()
  }
  setDataLogin(data: IApiLoginRes) {
    this.dataLogin.next(data);
  }
  setIsLogin(isLogin:boolean){
   this.isLogin = isLogin
  }
  getIsLogin(){
    return this.isLogin;
  }






}
