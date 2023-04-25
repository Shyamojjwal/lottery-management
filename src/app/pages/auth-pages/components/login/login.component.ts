import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any;

  constructor(
    private FB: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm = () => {
    this.loginForm = this.FB.group({
      userAuth: ['', [Validators.required]],
      userPass: ['', [Validators.required]]
    })
  }

  doUserLogin = () => {
    
  }

}
