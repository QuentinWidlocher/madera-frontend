import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
// La navbar que j'ai faite à la mano, elle est pas parfaite mais elle fera le taff
export class NavBarComponent {

  // Ici on mets les différents boutons avec leurs routes
  buttons = [
    { icon: 'home', title: 'home', route: '/home', active: false },
  ];

  constructor(private router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.highlightTab();
      }
    });
  }

  // Lance la navigation vers la route selectionnée
  navigate(url: string) {
    this.router.navigateByUrl(url).then(x => this.highlightTab());
  }

  // Met en surbrillance le bouton de la route
  highlightTab(url: string = '') {
    if (url === '') {
      url = this.router.url;
    }

    this.buttons.forEach(button => {
      if (url === button.route) {
        button.active = true;
      } else {
        button.active = false;
      }
    });
  }

}