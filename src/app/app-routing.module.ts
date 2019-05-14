import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './components/page/projects/projects.component';
import { TestComponent } from './components/page/test/test.component';
import { CustomersComponent } from './components/page/customers/customers.component';
import { DevisComponent } from './components/page/devis/devis.component';
import { LoginComponent } from './components/page/login/login.component';
import { CreateUsersComponent } from './components/page/create-users/create-users.component';
import {DossierTechniqueComponent } from './components/page/dossier-technique/dossier-technique.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { ModeleComponent } from './components/page/modele/modele.component';
import { DossierTechniqueTabComponent } from './components/page/dossier-technique-tab/dossier-technique-tab.component';

const routes: Routes = [
  { path: '',   redirectTo: '/projets', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'projets', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projets/:id', component: ProjectsComponent  , canActivate: [AuthGuard]},

  { path: 'test', component: TestComponent , canActivate: [AuthGuard]},

  { path: 'clients', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'clients/:id', component: CustomersComponent, canActivate: [AuthGuard] },

  { path: 'modele', component: ModeleComponent, canActivate: [AuthGuard] },
  { path: 'modele/:id', component: ModeleComponent, canActivate: [AuthGuard] },

  { path: 'devis/:id', component: DevisComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent},

  { path: 'utilisateurs', component: CreateUsersComponent, canActivate: [AuthGuard, AdminGuard] },
  
  { path: 'dossier/:id', component: DossierTechniqueComponent, canActivate: [AuthGuard] },

  { path: 'tableaudossier/:id', component: DossierTechniqueTabComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
