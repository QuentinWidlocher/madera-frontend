import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
// La navbar que j'ai faite à la mano, elle est pas parfaite mais elle fera le taff
export class NavBarComponent {

  // Ici on mets les différents boutons avec leurs routes
  buttons = [
    // { icon: 'bug_report', title: 'test page', route: '/test', active: false },
    { icon: 'people', title: 'Clients', route: '/customers', active: false },
    { icon: 'library_books', title: 'Projets', route: '/projects', active: false },
    // { icon: 'description', title: 'devis', route: '/devis', active: false },
  ];

  constructor(private router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.highlightTab(e.urlAfterRedirects);
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

}
