import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './blog-list/blog.component';
import { BlogViewComponent } from './blog-detail/blogView.component';
import { BlogCreateComponent } from './blog-create/blogCreate.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';

@NgModule({
  imports: [
      CommonModule,
      CKEditorModule,
      FormsModule,
      BlogRoutingModule
  ],
  declarations: [
      BlogComponent,
      BlogViewComponent,
      BlogCreateComponent,
      BlogEditComponent,
      BlogDeleteComponent
  ]
})
export class BlogModule { }
