import { Component, Input, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../blog.service';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})

export class BlogEditComponent implements OnInit {
  public Editor = ClassicEditor;
  @Input() user: any = {};
  loading: boolean;
  submitted: boolean;
  blog: any = {};
  newBlog: any = {};

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private blogService: BlogService,
      private authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.authService.me().subscribe(data => {
      this.user = data.user;
      this.blog.title = '';
      this.blog.body = '';
      this.blog.caption = '';

      const blogId = this.route.snapshot.paramMap.get('id');
      this.blogService.getBlog(blogId)
          .subscribe(blog => {
            this.blog = blog;
            this.loading = false;
          });
    });
  }

  onSubmit() {
    if(this.user && this.user.isAdmin) {
      this.loading = true;
      this.blogService.updateBlog(this.blog).subscribe(newBlog => {
        this.newBlog = newBlog;
        this.loading = false;
        this.submitted = true;
      });
    }
  }
}
