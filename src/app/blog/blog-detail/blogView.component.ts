import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { BlogService } from '../blog.service';


@Component({
    selector: 'app-blog',
    templateUrl: './blogView.component.html',
    styleUrls: ['../blog-list/blog.component.scss']

})

export class BlogViewComponent implements OnInit {
    loading: boolean;
    submitted: boolean;
    blog: any = {};
    blog$: Observable<{}>;
    model: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private blogService: BlogService
    ) {}

    ngOnInit() {
        this.blog.title = '';
        this.blog.body = '';
        this.blog.caption = '';

       let blogId = this.route.snapshot.paramMap.get('id');

        // this.blog$ = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) =>
        //         this.blogService.getBlog(params.get('id')))
        // );


        this.blogService.getBlog(blogId)
            .subscribe(blog => {
                this.blog = blog;
                this.loading = false;
            });

    }

    gotoBlogs() {
        this.router.navigate(['/blog']);
    }
}
