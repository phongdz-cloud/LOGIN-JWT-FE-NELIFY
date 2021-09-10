import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {JwtResponse} from '../model/JwtResponse';
import {SignInForm} from '../model/SignInForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // API LOCAL
  private API_SIGNUP = environment.API_LOCAL + 'signup'; // khái báo APi BE
  private API_SIGNIN = environment.API_LOCAL + 'signin'
  private API_SERVER_SIGNUP = environment.API_SERVER + 'signup';
  private API_SEVER_SIGNIN = environment.API_SERVER +'signin'
  constructor(private http: HttpClient) { }
  signUp(signUp: SignUpForm): Observable<any>{
    return this.http.post<any>(this.API_SERVER_SIGNUP, signUp);
  }
  signIn(signIn: SignInForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_SEVER_SIGNIN,signIn)
  }
}
