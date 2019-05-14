import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierTechniqueTabComponent } from './dossier-technique-tab.component';

describe('DossierTechniqueTabComponent', () => {
  let component: DossierTechniqueTabComponent;
  let fixture: ComponentFixture<DossierTechniqueTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierTechniqueTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierTechniqueTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
