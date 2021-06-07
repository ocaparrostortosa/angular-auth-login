import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  isLoggedIn = false

  constructor(public firebaseAuth: AngularFireAuth) { }

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(response => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(response.user));
    })
  }

  logOut(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

}
