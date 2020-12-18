import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import firebase from 'firebase';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string;
  user_Id: any;
  name: any;
  usernames: any;
  photo_Profile: any;
  mainuser: AngularFirestoreDocument;
  checkin_date: any;
  place: any;

  
  constructor(
    public authSrv: AuthenticationService,
    public afDatabase: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
      this.authSrv.getUserData().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({user_id: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(() => {
      this.user_Id = firebase.auth().currentUser.uid;
      console.log('USER ID CURRENT', this.user_Id);
      this.afDatabase.database.ref('users/' + this.user_Id).once('value').then( userDetailsAsObject => {

        this.name = userDetailsAsObject.val().name;
        this.email = userDetailsAsObject.val().emails;
        this.usernames = userDetailsAsObject.val().usernames;
        this.photo_Profile = userDetailsAsObject.val().photo_profile;

      }).catch( err => {
        console.log('Error pulling /profile table inside functionName() inside componentName.component.ts');
        console.log(err);
      });
    });

    this.afDatabase.database.ref('users/' + this.user_Id + '/checkin_history').once('value').then((dataSnapshot) => {
      const keyLoc = Object.keys(dataSnapshot.val());
      const locationList: string[] = [];
      
      console.log('LOCATION KEY', keyLoc);
      keyLoc.forEach((child) => {
      this.afDatabase.database.ref('users/' + this.user_Id + '/checkin_history/' + child).once('value').then((snapshot) => {
      this.checkin_date = snapshot.val().checkin_date;
      this.place = snapshot.val().place;
      return false;
          });
        });
      })
  }

  logout() {
    this.authSrv.SignOut()
      .then(res=> {
        console.log(res);
        this.router.navigateByUrl('/login');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
