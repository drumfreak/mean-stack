import {Component, Input, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../blog.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blogCreate.component.html',
    styleUrls: ['../blog-list/blog.component.scss']
})

export class BlogCreateComponent implements OnInit {
    public Editor = ClassicEditor;
    user = (<any>window).user;
    loading: boolean;
    submitted: boolean;
    newBlog: any = {};
    model: any = {};

    constructor(
        private blogService: BlogService
    ) { }

    ngOnInit() {
        this.loading = true;
        this.model.title = '';
        this.model.body = '';
        this.model.caption = '';
        this.newBlog = {};
        this.loading = false;
    }

    onSubmit() {
        if (this.user && this.user.isAdmin) {
            this.loading = true;
            this.blogService.createBlog(this.model).subscribe(newBlog => {
                this.newBlog = newBlog;
                this.loading = false;
                this.submitted = true;
            });
        }
    }

}
