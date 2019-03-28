import {Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UserprofileService} from '../userprofile.service';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../auth/auth.service';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
const URL = '/api/userprofile/upload';

@Component({
    selector: 'app-userprofile-edit',
    templateUrl: './userprofile-edit.component.html',
    styleUrls: ['./userprofile-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserprofileEditComponent implements OnInit {
    // public Editor = ClassicEditor;
    user = (<any>window).user;
    userProfile: any = {};
    loading: boolean;
    newProfile: any = {};
    submitted: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private userProfileService: UserprofileService,
        private http: HttpClientModule,
        private el: ElementRef,
        private ref: ChangeDetectorRef
    ) {}

    public uploader: FileUploader;

    ngOnInit() {
        this.userProfile.profileImage = '/assets/dummyUser.jpg';
        this.uploader = new FileUploader({
            url: URL, itemAlias: 'photo',
            authToken: 'Bearer ' + this.authService.getToken()
        });


        this.loading = true;
        this.submitted = false;
        const userId = this.route.snapshot.paramMap.get('id');
        this.userProfileService.getUserProfile(userId)
            .subscribe(userProfile => {
                this.userProfile = userProfile;
                if (!this.userProfile.profileImage) {
                    this.userProfile.profileImage = '/assets/dummyUser.jpg';
                }
                this.loading = false;
                this.ref.markForCheck();
            });


        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        // override the onCompleteItem property of the uploader so we are
        // able to deal with the server response.
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            // console.log("ImageUpload:uploaded:", item, status, response);
            this.loading = true;
            let images = JSON.parse(response);
            if (images.images.length > 0) {
                this.userProfile.profileImage = images.images[0];
                setTimeout(() => {
                    this.ref.markForCheck();
                    this.loading = false;
                }, 1000);
            }
        };

        if(!this.user) {
            this.authService.me();
            setTimeout(() => {
                this.user = (<any>window).user;
                this.loading = false;
                this.ref.markForCheck();
            }, 1000);
        } else {
            this.loading = false;
            this.ref.markForCheck();
        }

    }

    onCancel() {
        this.router.navigate(['userprofile', this.user._id]).then((e) => {
            if (e) {
                console.log("Profile update is successful!");
            }
        });
    }

    onSubmit() {
        if (this.user || this.user.isAdmin) {
            this.loading = true;
            this.userProfileService.updateProfile(this.userProfile).subscribe(newProfile => {
                this.newProfile = newProfile;
                this.loading = false;
                this.submitted = true;
                this.router.navigate(['userprofile', this.user._id]).then((e) => {
                    if (e) {
                        console.log("Profile update is successful!");
                    }
                });
            });
        }
    }
}
