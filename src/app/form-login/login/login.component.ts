import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {TokenService} from '../../service/token.service';
import {SignInForm} from '../../model/SignInForm';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status = 'Please full in the form login!';
  isLogin = false;
  isSuccess = false;
  form:any = {};
  hide = true;
  roles: string[] = [];
  name: string;
  signInForm: SignInForm;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }
  ngSubmit(){
      this.signInForm = new SignInForm(
        this.form.username,
        this.form.password
      );
      this.authService.signIn(this.signInForm).subscribe(data =>{
        if(data.token != undefined){
              this.tokenService.setToken(data.token);
              this.tokenService.setName(data.name);
              this.tokenService.setRoles(data.roles);
              this.isSuccess = true;
              this.status = 'Chúc mừng bạn đã đăng nhập thành công nhấn vào HomePage để chuyển trang!'
            }
        else{
          this.isLogin = true
        }
      })
  }
  ngSuccess(){
    this.router.navigate(['user-account']).then(()=>{
      window.location.reload();
    });
  }
}
