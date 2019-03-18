import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog-list/blog.component';
import { BlogViewComponent } from './blog-detail/blogView.component';
import { BlogCreateComponent } from './blog-create/blogCreate.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';

const blogRoutes: Routes = [
    { path: 'blog',  component: BlogComponent },
    { path: 'blog/create',  component: BlogCreateComponent },
    { path: 'blog/:id', component: BlogViewComponent },
    { path: 'blog/:id/edit', component: BlogEditComponent },
    { path: 'blog/:id/delete', component: BlogDeleteComponent }
];

@NgModule({
  imports: [
      RouterModule.forChild(blogRoutes)
  ],
  exports: [
      RouterModule
  ]
})

export class BlogRoutingModule { }
