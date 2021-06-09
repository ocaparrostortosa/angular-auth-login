import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ErrorBottomSheetComponent } from '@components/error-bottom-sheet/error-bottom-sheet.component';

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
    private _loginService: FirebaseLoginService,
    //Error Bottom-sheet
    private _bottomSheet: MatBottomSheet,

  ) {
    this.signinForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    })
    /*
        this.signinForm.valueChanges.subscribe(data => {      
          if(data.email !== null){
            this.errorMessage = "";        
          }
        })*/
  }

  /**This method is used to logIn in Firebase */
  email: string = "";
  password: string = "";

  async signIn() {
    if (this.signinForm.valid) {
      await this._loginService.signIn(this.email, this.password)
        .then(() =>
          this._bottomSheet.open(ErrorBottomSheetComponent, { data: { errorMessage: "Successful login" } }).afterDismissed().subscribe(() => {
            this.signinForm.reset();
          })
        ).catch((error) => {

          this._bottomSheet.open(ErrorBottomSheetComponent, { data: { errorMessage: error.message } }).afterDismissed().subscribe(() => {
            this.signinForm.reset();
          });
        }
        )
    }
  }

  ngOnInit(): void {
  }

}
