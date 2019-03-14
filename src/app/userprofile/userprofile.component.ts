import { Component, OnInit } from '@angular/core';

import { Userprofile } from './userprofile';
import { UserprofileService } from './userprofile.service';

@Component({
  selector: 'app-home',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  userProfile: Userprofile[];
  userId: string;
  loading: boolean;
  user = (<any>window).user;

  model: any = {};

  constructor(private userprofileService: UserprofileService) { }

  ngOnInit() {
    // console.log('NG Inited');
    this.userProfile = [];
    this.getProfile(this.userId);
  }


  onSubmit() {
    this.userProfile = [];
    this.getProfile(this.user.id);
  }

  getProfile(userId): void {
    this.userProfile = [];
    this.userId = userId;
    if (userId.length === 0) {
      this.userProfile = [];
    } else {
      this.loading = true;
      this.userprofileService.getUserProfile(userId)
        .subscribe(userProfile => {
          this.userProfile = userProfile;
          // console.log(wLocation);
          // console.log(weather);
          this.loading = false;
        });
    }

  }
}
