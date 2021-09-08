import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {SignUpForm} from '../../model/SignUpForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  status = '';
  signUpForm: SignUpForm;
  form: any = {};
  error1: any = {
    message: "nouser"
  };
  error2: any = {
    message: "noemail"
  };
  success: any = {
    message: "yes"
  };
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private authenService: AuthService) { }

  ngOnInit(): void {
  }
  ngSubmit(){
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    this.authenService.signUp(this.signUpForm).subscribe(data => {
      console.log(data);
      if ( JSON.stringify(data) == JSON.stringify(this.error1)){
        this.status = 'The username is existed! Please try again!';
      }
      if ( JSON.stringify(data) == JSON.stringify(this.error2)) {
        this.status = 'The email is existed! Please try again!';
      }
      if ( JSON.stringify(data) == JSON.stringify(this.success)) {
        this.status = 'Create user successfully';
      }
    },
      error => {
      });
  }
}
