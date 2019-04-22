import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './components/page/projects/projects.component';
import { TestComponent } from './components/page/test/test.component';
import { CustomersComponent } from './components/page/customers/customers.component';
import { DevisComponent } from './components/page/devis/devis.component';
import { LoginComponent } from './components/page/login/login.component';
import { CreateUsersComponent } from './components/page/create-users/create-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'test', component: TestComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'devis', component: DevisComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-users', component: CreateUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
