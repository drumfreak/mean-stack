import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from './userprofile-detail/userprofile.component';
import { UserprofileEditComponent } from './userprofile-edit/userprofile-edit.component';

const routes: Routes = [
  {
    path: 'userprofile/:id',
    component: UserprofileComponent
  }, {
    path: 'userprofile/:id/edit',
    component: UserprofileEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserprofileRoutingModule { }
