import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogComponent implements OnInit {
    @Input() user: any = {};
    blogs: any = {count: 0, data: []};
    loading: boolean;
    page: 0;
    limit: 10;
    totalBlogs: number;
    totalPages: number;
    model: any = {};
    blogsList$: any = [];

  constructor(
      private blogService: BlogService,
      private route: ActivatedRoute,
      private authService: AuthService,
      private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.page = 0;
    this.limit = 10;
    this.authService.me().subscribe(data => {
      this.user = data.user;
    });
    this.blogsList$ = [];
    this.getBlogs(this.page, this.limit);
  }

  getNextBlogs() {
      this.page++;
      this.getBlogs(this.page, this.limit);
  }

  getBlogs(page, limit): void {
    this.loading = true;
    this.blogService.getBlogs(page, limit)
        .subscribe(blogs => {
          this.blogs = blogs;
          if (this.blogsList$.length > 0) {
             this.blogsList$ =  this.blogsList$.concat(this.blogs.data);
          } else {
              this.blogsList$ = this.blogs.data;
          }
          this.ref.markForCheck();
          this.totalBlogs = this.blogs.count;
          this.totalPages = Math.round(this.totalBlogs / this.limit);
          this.loading = false;
        });
  }
}
