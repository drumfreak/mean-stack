import {Component, Input, OnInit} from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
    @Input() user: any = {};
    blogs$: Observable<Blog[]>;
    selectedId: number;
    blogs: Blog[];
    loading: boolean;
    page: 0;
    model: any = {};

  constructor(
      private blogService: BlogService,
      private route: ActivatedRoute,
      private authService: AuthService
  ) { }

  ngOnInit() {
    // console.log('NG Inited');
    // this.blogs = [];
    this.page = 0;
    // this.getBlogs(this.page);
    this.authService.me().subscribe(data => {
      this.user = data.user;
    });
    this.blogs$ = this.route.paramMap.pipe(
        switchMap(params => {
          // (+) before `params.get()` turns the string into a number
          this.selectedId = +params.get('id');
          return this.blogService.getBlogs(this.page);
        })
    );
  }

  getBlogs(page): void {
   // this.blogs = [];
    this.loading = true;
    this.blogService.getBlogs(page)
        .subscribe(blogs => {
          this.blogs = blogs;
          console.log(blogs);
          this.loading = false;
        });
  }

}
