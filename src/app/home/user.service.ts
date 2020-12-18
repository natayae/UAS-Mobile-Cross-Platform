import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/user';
  userRef: AngularFireList<User> = null;
  constructor(
    private db: AngularFireDatabase
  ) {
    this.userRef = db.list(this.dbPath);
  }

  getUser(userid: string){
    return this.db.object('user/' + userid).valueChanges();
  }

  getAllUser(){
    return this.userRef;
  }

  upLatLng(lat: number, lng: number, userId: string){
    this.userRef = this.db.list('/user');
    return this.userRef.update(userId, {
      lat: lat,
      lng: lng
    });
  }
}
