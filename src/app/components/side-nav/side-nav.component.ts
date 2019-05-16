import { Component, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, Subscription } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  // Ici on mets les différents boutons avec leurs routes
  buttons = [
    // { icon: 'bug_report', title: 'test page', route: '/test', active: false },
    { icon: 'library_books', title: 'Projets', route: '/projets', active: false },
    { icon: 'people', title: 'Clients', route: '/clients', active: false },
    // { icon: 'description', title: 'devis', route: '/devis', active: false },
  ];

  status: boolean;
  subscription: Subscription;
  userName: string;
  isAdmin: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog) { 
      router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.highlightTab(e.urlAfterRedirects);
        }
      });
    }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => {
      this.status = status;
      if (this.status) {
        this.userName = this.userService.getUserName();
        this.isAdmin = this.userService.getRole() === 'Admin'
      }
    });
  }

  // Lance la navigation vers la route selectionnée
  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  // Met en surbrillance le bouton de la route
  highlightTab(url: string = this.router.url) {
    this.buttons.forEach(button => {
      button.active = (url.startsWith(button.route));
    });
  }

  logout() {
    this.dialog.open(LogoutConfirmationDialog, {
    }).afterClosed().subscribe(ok => {
      if (ok) {
        this.userService.logout();
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}

@Component({
  selector: 'logout-confirmation-dialog',
  templateUrl: './logout-confirmation.dialog.html'
})
export class LogoutConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

}
