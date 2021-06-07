import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FirebaseUser } from 'src/app/interfaces/FirebaseUser';

import { map } from 'rxjs/operators'

//This decorator allow to having an instance of FirebaseService for the module.
@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {

  //This one will contains an array of Firebase users.
  private firebaseUsersList: AngularFireList<FirebaseUser>;

  constructor(private _database: AngularFireDatabase) {
    /**This code is used to get access to de database
     * Getting the 'user' list
     * Ussing "orderByChild" we can order the user list.
     */
    this.firebaseUsersList = this._database.list('/ngUsers', (ref) =>
      ref.orderByChild('name')
    );
  }

  /** getFirebaseUsers(): Method to get all the firebase users
   * @returns Observable<FirebaseUser[]> Returns an FirebaseUsers Observable
   */
  getFirebaseUsers(): Observable<FirebaseUser[]> {
    //We need to import the 'map' to returns all the data from every user
    //'pipe' allows modifies.
    //The 'payload' is from where is the data moving.
    return this.firebaseUsersList.snapshotChanges().pipe(
      map((changes: any[]) => {
        return changes.map((c: { payload: { key: any; val: () => any; }; }) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      }));
  }

  /**addFirebaseUser(): This method allow us to add new FirebaseUsers.
   * We don't need more configuration, Firebase does all for us. No new tables, no new groups needed.
   * @returns Anything. Just push a new user to the database.
  */
  addFirebaseUser(user: FirebaseUser){
    return this.firebaseUsersList.push(user);
  }

  /**deleteFirebaseUser(userId: FirebaseUser id value): You already know? Yashh, this method just delete a user from the db. Great job! :D
   * @returns Anything. Just send the user id to delete this users from the database.
   */
  deleteFirebaseUser(userId: string){
    this._database.list('/ngUsers').remove(userId);
  }

  /**editFirebaseUser(new user data): All we need to edit a existing user is this method.
   * @returns Anything again.
   */
  editFirebaseUser(newUserData: FirebaseUser){ //Could be <any>
    const $key: string = newUserData.$key!;
    delete newUserData.$key;
    this._database.list('/ngUsers').update($key, newUserData);
  }


}
