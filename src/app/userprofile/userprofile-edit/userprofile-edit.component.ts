import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserprofileService } from '../userprofile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-userprofile-edit',
  templateUrl: './userprofile-edit.component.html',
  styleUrls: ['./userprofile-edit.component.scss']
})
export class UserprofileEditComponent implements OnInit {
  public Editor = ClassicEditor;
  user = (<any>window).user;
  userProfile:  any = {};
  loading: boolean;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userProfileService: UserprofileService

  ) { }

  ngOnInit() {
    this.loading = true;
    const userId = this.route.snapshot.paramMap.get('id');
    this.userProfileService.getUserProfile(userId)
        .subscribe(userProfile  => {
          this.userProfile = userProfile;
          this.loading = false;
        });

    this.loading = false;
  }

  onSubmit() {

  }

}
