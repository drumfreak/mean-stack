import { switchMap } from 'rxjs/operators';
import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'app-blog',
    templateUrl: './blogView.component.html',
    styleUrls: ['../blog-list/blog.component.scss']

})

export class BlogViewComponent implements OnInit {
    @Input() user: any = {};
    loading: boolean;
    submitted: boolean;
    blog: any = {};
    blog$: Observable<{}>;
    model: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private blogService: BlogService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.blog.title = '';
        this.blog.body = '';
        this.blog.caption = '';

        this.authService.me().subscribe(data => {
            this.user = data.user;
        });

       const blogId = this.route.snapshot.paramMap.get('id');
        this.blogService.getBlog(blogId)
            .subscribe(blog => {
                this.blog = blog;
                this.loading = false;
            });

    }

    navigate(id: number) {
        id = id || 1;
        this.router.navigate([`/blog/${id}`]);
        const blogId = id;
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
