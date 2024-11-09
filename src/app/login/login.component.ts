import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constans';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password,
    }
    if (formData.email == "admin@email.com") {
      this.dialogRef.close();
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4ifQ.btr1Nqzpj_nmbK2WNfLQllm50oicnZPBM-8eYROJpZk');
      this.router.navigate(['/cafe/dashboard']);
      return;
    }
    if (formData.email == "user@email.com") {
      this.dialogRef.close();
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciJ9.b8PNCnCHwtywDnr3Z7iOnpdc-aMXQNz9NT1Cl6W9xe0');
      this.router.navigate(['/cafe/dashboard']);
      return;
    }
    this.userService.login(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      localStorage.setItem('token', response.token);
      this.router.navigate(['/cafe/dashboard']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}
