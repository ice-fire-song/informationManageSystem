import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//配置路由-引入模板

import { HomeComponent } from './home/home.component';
import { RegisterWinComponent } from './registerwin/registerwin.component';
import { RegisterokComponent } from './registerok/registerok.component';
import { ManagementComponent } from './management/management.component';
import { OrdinaryComponent } from './ordinary/ordinary.component'
import { OneComponent } from './search/one/one.component'
import { TwoComponent } from './search/two/two.component'
const routes: Routes = [

//配置路由
{
  path:'home',component:HomeComponent
},
{
  path:'register',component:RegisterWinComponent
},
{
  path:'success',component:RegisterokComponent
},
{
  path:'manage',component:ManagementComponent
},
{
  path:'ordinary',component:OrdinaryComponent
},
{
  path:'searchOne',component:OneComponent
},
{
  path:'searchTwo',component:TwoComponent
},
{
 path:'**',component:ManagementComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
