import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from './blog.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blogCreate.component.html',
    styleUrls: ['./blog.component.scss']

})

export class BlogCreateComponent implements OnInit {
    public Editor = ClassicEditor;
    loading: boolean;
    submitted: boolean;
    newBlog: any = {};
    model: any = {};

    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.model.title = '';
        this.model.body = '';
        this.model.caption = '';
        this.newBlog = {};
    }

    onSubmit() {
        // console.log(this.model);
        this.loading = true;
        this.blogService.createBlog(this.model).subscribe(newBlog => {
            console.log(newBlog);
            this.newBlog = newBlog;
            this.loading = false;
            this.submitted = true;
        });
    }

}
