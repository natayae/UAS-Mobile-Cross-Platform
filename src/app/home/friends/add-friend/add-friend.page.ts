import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { FriendService } from '../../friend.service';
import { UserService } from '../../user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {

  userId: string;
  length: number;
  user: any;
  tabUserEmail: any;
  tabFriendEmail: any;
  tmpFriend: any;
  friendList = [];
  cekFriend: boolean = false;
  allUser: any

  constructor(
    private friendSrv: FriendService,
    private userSrv: UserService,
    private authSrv: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      console.log(res.uid);
      if(res !== null){
        this.userId = res.uid;
        this.userSrv.getUser(this.userId).subscribe(profile => {
          this.user = profile;
        });
      }
    });
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    this.userSrv.getUser(this.userId).subscribe(profile => {
      this.tabUserEmail = profile;
      console.log(this.tabUserEmail.email, f.value.email);
      if(this.tabUserEmail.email == f.value.email){
        console.log('tidak bisa add diri sendiri!');
      } 
      else {
        this.friendSrv.getAllFriend(this.userId).snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(data => {
          this.tmpFriend = data;
          console.log(this.tmpFriend);
          if(this.tmpFriend.length == 0){
            console.log(f.value.email, this.userId, this.tmpFriend.length);
            this.friendSrv.newFriend(f.value.email, this.userId, this.tmpFriend.length).then(res => {
              console.log(res);
              this.router.navigateByUrl('home/tabs/friends');
            }).catch(error => console.log(error));
          }
          if (this.tmpFriend.length > 0){
            this.friendSrv.getAllFriend(this.userId).snapshotChanges().pipe(
              map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
                )
            ).subscribe(data => {
              this.tabFriendEmail = data;
              console.log(this.tabFriendEmail);
              for(let i = 0; i < this.tabFriendEmail.length;){
                if(this.tabFriendEmail[i].email == f.value.email){
                  this.cekFriend = false;
                  console.log('Teman berhasil di Add');
                  break;
                } else {
                  this.cekFriend = true;
                  i++;
                }
              }
              if(this.cekFriend == true){
                this.friendSrv.newFriend(f.value.email, this.userId, this.tmpFriend.length).then(res => {
                  console.log(res);
                  this.router.navigateByUrl('home/tabs/friends');
                }).catch(error => console.log(error));
              }
            })
          }
        });
      }
    });
  }
}
