import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/page/projects/projects.component';
import { TestComponent } from './components/page/test/test.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from "./auth-interceptor";
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatButtonModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CustomersComponent, ClientDeleteConfirmationDialog } from './components/page/customers/customers.component';
import { EditProjectComponent, ProjetDeleteConfirmationDialog } from './components/page/projects/edit-project/edit-project.component';
import { DevisComponent } from './components/page/devis/devis.component';
import { LoginComponent } from './components/page/login/login.component';
import { CreateUsersComponent, UtilisateurDeleteConfirmationDialog } from './components/page/create-users/create-users.component';
import { SideNavComponent, LogoutConfirmationDialog } from './components/side-nav/side-nav.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DossierTechniqueComponent, AddModeleDialog } from './components/page/dossier-technique/dossier-technique.component';
import { ModeleComponent, ModuleSizesDialog, AddProduitDialog, AddModuleDialog } from './components/page/modele/modele.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProjectsComponent,
    TestComponent,
    CustomersComponent,
    EditProjectComponent,
    ProjetDeleteConfirmationDialog,
    ClientDeleteConfirmationDialog,
    UtilisateurDeleteConfirmationDialog,
    DevisComponent,
    LoginComponent,
    CreateUsersComponent,
    SideNavComponent,
    LogoutConfirmationDialog,
    DossierTechniqueComponent,
    ModeleComponent,
    ModuleSizesDialog,
    AddProduitDialog,
    AddModuleDialog,
    AddModeleDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    AdminGuard
  ],
  entryComponents: [
    LogoutConfirmationDialog,
    ProjetDeleteConfirmationDialog,
    ClientDeleteConfirmationDialog,
    UtilisateurDeleteConfirmationDialog,
    ModuleSizesDialog,
    AddProduitDialog,
    AddModuleDialog,
    AddModeleDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

registerLocaleData(localeFr);
