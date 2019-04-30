import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierTechniqueComponent } from './dossier-technique.component';

describe('DossierTechniqueComponent', () => {
  let component: DossierTechniqueComponent;
  let fixture: ComponentFixture<DossierTechniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierTechniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
