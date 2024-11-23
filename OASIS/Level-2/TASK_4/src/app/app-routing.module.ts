import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecuredpageComponent } from './components/securedpage/securedpage.component';
import { SecurepageguardGuard } from './guards/securepageguard.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:"page", component:SecuredpageComponent, canActivate:[SecurepageguardGuard]},
  {path:"", redirectTo:"page", pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
