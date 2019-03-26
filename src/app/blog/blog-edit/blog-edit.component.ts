import {Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BlogService} from '../blog.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../auth/auth.service';
const URL = '/api/blog/upload';

@Component({
    selector: 'app-blog-edit',
    templateUrl: './blog-edit.component.html',
    styleUrls: ['./blog-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogEditComponent implements OnInit {
    public Editor = ClassicEditor;
    user = (<any>window).user;
    loading: boolean;
    submitted: boolean;
    blog: any = {};
    newBlog: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private blogService: BlogService,
        private ref: ChangeDetectorRef
    ) {
    }

    public uploader: FileUploader;

    ngOnInit() {
        this.loading = true;
        this.blog.title = '';
        this.blog.body = '';
        this.blog.caption = '';

        this.uploader = new FileUploader({
            url: URL, itemAlias: 'blogphoto',
            authToken: 'Bearer ' + this.authService.getToken()
        });

        const blogId = this.route.snapshot.paramMap.get('id');
        this.blogService.getBlog(blogId)
            .subscribe(blog => {
                this.blog = blog;
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
                // console.log(images.images);
                this.blog.blogImage = images.images[0];
                // console.log('Profile Image', this.userProfile.profileImage);
                setTimeout(() => {
                    this.ref.markForCheck();
                    this.loading = false;
                }, 1000);
            }
        };
    }

    onSubmit() {
        if (this.user && this.user.isAdmin) {
            this.loading = true;
            this.blogService.updateBlog(this.blog).subscribe(newBlog => {
                this.newBlog = newBlog;
                this.loading = false;
                this.submitted = true;
                this.router.navigate(['blog', this.newBlog._id]).then((e) => {
                    if (e) {
                        console.log("Profile update is successful!");
                    }
                });
            });
        }
    }
}
