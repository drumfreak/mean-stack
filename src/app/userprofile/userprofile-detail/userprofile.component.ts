import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Userprofile } from '../userprofile';
import { UserprofileService } from '../userprofile.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  userProfile: any = {};
  userId: string;
  loading: boolean;
  user = (<any>window).user;
  model: any = {};
  constructor(
      private userprofileService: UserprofileService,
      private route: ActivatedRoute,
      private authService: AuthService
  ) { }

  ngOnInit() {
    // console.log('NG Inited');
    this.userProfile = {};
    const userId = this.route.snapshot.paramMap.get('id');
    this.getProfile(userId);
  }


  onSubmit() {
    this.userProfile = {};
    this.getProfile(this.user.id);
  }

  getProfile(userId): void {
    this.userProfile = {};
    this.userId = userId;
    if (userId.length > 0) {
      this.loading = true;
      this.userprofileService.getUserProfile(userId)
        .subscribe(userProfile => {
          this.userProfile = userProfile;
          if(!this.userProfile.profileImage) {
            this.userProfile.profileImage = '/assets/dummyUser.jpg';
          }

          this.loading = false;
        });
    }

  }
}
