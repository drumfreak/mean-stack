import { Component, Input, OnInit} from '@angular/core';
import { BlogService } from '../blog.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blog-delete',
  templateUrl: './blog-delete.component.html',
  styleUrls: ['./blog-delete.component.scss']
})

export class BlogDeleteComponent implements OnInit {
  user = (<any>window).user;
  loading: boolean;
  submitted: boolean;
  blog: any = {};
  response: any = {};

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private blogService: BlogService
  ) {}

  ngOnInit() {
      this.blog.title = '';
      this.blog.body = '';
      this.blog.caption = '';
      const blogId = this.route.snapshot.paramMap.get('id');
      this.blogService.getBlog(blogId)
          .subscribe(blog => {
            this.blog = blog;
            this.loading = false;
          });
  }

  onDelete() {
    if(this.user && this.user.isAdmin) {
      this.loading = true;
      this.blogService.deleteBlog(this.blog._id).subscribe(response => {
        console.log(response);
        this.response = response;
        this.loading = false;
        this.submitted = true;
      });
    }
  }
}
