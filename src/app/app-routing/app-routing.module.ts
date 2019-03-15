import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { AboutComponent } from '../about/about.component';
import { WeatherComponent } from '../weather/weather.component';
import { RadarComponent } from '../radar/radar.component';
import { ContactComponent } from '../contact/contact.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: 'weather',
  component: WeatherComponent
}, {
  path: 'radar',
  component: RadarComponent
}, {
    path: 'userprofile',
    component: UserprofileComponent
}, {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
