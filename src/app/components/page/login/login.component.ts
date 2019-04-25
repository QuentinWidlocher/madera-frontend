import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Credentials } from '../../../classes/credentials';
import { error } from '@angular/compiler/src/util';
import { catchError, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  isRequesting: boolean;
  submitted: boolean = false;
  errors: string;
  get form() { return this.loginForm.controls; }
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
 
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: [Validators.required],
      password: [Validators.required, Validators.minLength(6)]
    });
  }

  public login({ value, valid }: { value: Credentials, valid: boolean }) {


    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
        (res) => {
          this.router.navigate(['create-users']);
        }, err => this.errors= err);
        
       
    }
  }
}
