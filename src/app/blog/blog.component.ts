import { Component, OnInit } from '@angular/core';

import { Blog } from './blog';
import { BlogService } from './blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  blogs: Blog[];
  loading: boolean;
  page: 0;
  model: any = {};

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    // console.log('NG Inited');
    this.blogs = [];
    this.page = 0;
    this.getBlogs(this.page);
  }

  getBlogs(page): void {
    this.blogs = [];
    this.loading = true;
    this.blogService.getBlogs(page)
        .subscribe(blogs => {
          this.blogs = blogs;
          console.log(blogs);
          this.loading = false;
        });
  }

}
