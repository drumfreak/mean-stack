import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FormsModule } from '@angular/forms';

import { BlogComponent } from './blog-list/blog.component';
import { BlogViewComponent } from './blog-detail/blogView.component';
import { BlogCreateComponent } from './blog-create/blogCreate.component';
import { BlogRoutingModule } from './blog-routing.module';

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
      BlogCreateComponent
  ]
})
export class BlogModule { }
