import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './components/page/projects/projects.component';
import { TestComponent } from './components/page/test/test.component';
import { CustomersComponent } from './components/page/customers/customers.component';
import { DevisComponent } from './components/page/devis/devis.component';
import { LoginComponent } from './components/page/login/login.component';
import { CreateUsersComponent } from './components/page/create-users/create-users.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/projects', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'projects', component: ProjectsComponent  , canActivate: [AuthGuard]},
  { path: 'test', component: TestComponent , canActivate: [AuthGuard]},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'customers/:id', component: CustomersComponent, canActivate: [AuthGuard]  },
  { path: 'devis', component: DevisComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'create-users', component: CreateUsersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
