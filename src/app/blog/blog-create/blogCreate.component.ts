import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../blog.service';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../auth/auth.service';
const URL = '/api/blog/upload';

@Component({
    selector: 'app-blog',
    templateUrl: './blogCreate.component.html',
    styleUrls: ['../blog-list/blog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogCreateComponent implements OnInit {
    public Editor = ClassicEditor;
    user = (<any>window).user;
    loading: boolean;
    submitted: boolean;
    newBlog: any = {};
    model: any = {};

    constructor(
        private blogService: BlogService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private ref: ChangeDetectorRef
    ) { }

    public uploader: FileUploader;

    ngOnInit() {
        this.loading = true;
        this.newBlog = {};
        this.newBlog.title = '';
        this.newBlog.body = '';
        this.newBlog.caption = '';
        this.loading = true;
        this.uploader = new FileUploader({
            url: URL, itemAlias: 'blogphoto',
            authToken: 'Bearer ' + this.authService.getToken()
        });

        // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
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
                this.newBlog.blogImage = images.images[0];
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

    onSubmit() {
        if (this.user && this.user.isAdmin) {
            this.loading = true;
            this.blogService.createBlog(this.newBlog).subscribe(newBlog => {
                this.newBlog = newBlog;
                this.loading = false;
                this.submitted = true;
                this.router.navigate(['blog', this.newBlog._id]).then((e) => {
                    if (e) {
                        console.log("Blog submission was successful!");
                    }
                });
            });
        }
    }

}
