import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/page/home/home.component';
import { UserProjectComponent } from './components/page/user-project/user-project.component';
import { TestComponent } from './components/page/test/test.component';
import { CustomersComponent } from './components/page/customers/customers.component';
import { DevisComponent } from './components/page/devis/devis.component';
import { LoginComponent } from './components/page/login/login.component';
import { CreateUsersComponent } from './components/page/create-users/create-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-project', component: UserProjectComponent },
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
