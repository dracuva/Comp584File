import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = 'auth_token';
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();
  constructor(private http: HttpClient) {}

  init() {
    if (this.isLoggedIn()) {
      this.setAuthStatus(true);
    }
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._authStatus.next(isAuthenticated);
  }
  
  login(loginRequest: LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + 'api/Admin', loginRequest)
    .pipe(tap(response => {
      if(response.success) {
        this.setAuthStatus(true);
        localStorage.setItem(this.token, response.token);
      }

    }));
}
getToken(): string | null {
  return localStorage.getItem(this.token);
}
logout(){
  this.setAuthStatus(false);
  localStorage.removeItem(this.token);
}
isLoggedIn(): boolean {
  return localStorage.getItem(this.token) !== null;
}
}