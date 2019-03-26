import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserprofileComponent } from './userprofile-detail/userprofile.component';
import { UserprofileEditComponent } from './userprofile-edit/userprofile-edit.component';
import { UserprofileRoutingModule } from './userprofile-routing.module';
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      FileUploadModule,
      CKEditorModule,
      UserprofileRoutingModule
  ],
  declarations: [
      UserprofileEditComponent,
      UserprofileComponent
  ]
})
export class UserprofileModule { }
