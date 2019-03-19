import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserprofileComponent } from './userprofile-detail/userprofile.component';
import { UserprofileEditComponent } from './userprofile-edit/userprofile-edit.component';
import { UserprofileRoutingModule } from './userprofile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    UserprofileRoutingModule
  ],
  declarations: [
    UserprofileEditComponent,
    UserprofileComponent
  ]
})
export class UserprofileModule { }
