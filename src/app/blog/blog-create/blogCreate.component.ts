import {Component, Input, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../blog.service';
import { AuthService } from '../../auth/auth.service';



@Component({
    selector: 'app-blog',
    templateUrl: './blogCreate.component.html',
    styleUrls: ['../blog-list/blog.component.scss']

})

export class BlogCreateComponent implements OnInit {
    public Editor = ClassicEditor;
    @Input() user: any = {};
    loading: boolean;
    submitted: boolean;
    newBlog: any = {};
    model: any = {};

    constructor(
        private blogService: BlogService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // init this.user on startup
        this.authService.me().subscribe(data => {
            this.user = data.user;
        });
        this.model.title = '';
        this.model.body = '';
        this.model.caption = '';
        this.newBlog = {};
    }

    onSubmit() {
        // console.log(this.model);
        if(this.user && this.user.isAdmin) {
            this.loading = true;
            this.blogService.createBlog(this.model).subscribe(newBlog => {
                console.log(newBlog);
                this.newBlog = newBlog;
                this.loading = false;
                this.submitted = true;
            });
        }
    }

}
