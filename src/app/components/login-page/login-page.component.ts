import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseLoginService } from '@firebaseServices/firebase-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    //FormBuilder: Needed for validate our forms.
    private _builder: FormBuilder,
    //Firebase login service
    private _loginService: FirebaseLoginService

  ) {
    this.signinForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    })

    this.signinForm.valueChanges.subscribe(data => {      
      if(data.email !== null){
        this.errorMessage = "";        
      }
    })
  }

  /**This method is used to logIn in Firebase */
  errorMessage: string = "";
  async signIn(values: any) {
    await this._loginService.signIn(values.email, values.password)
      .then(() =>
        console.log("Dentro")
      ).catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            this.errorMessage = error.message;
            this.signinForm.reset();
            break;
          case "auth/invalid-email":
            this.errorMessage = error.message;
            this.signinForm.reset();
            break;
          default:
            this.errorMessage = error.message;
            this.signinForm.reset();
            break;
        }
      })
  }

  ngOnInit(): void {
  }

}
