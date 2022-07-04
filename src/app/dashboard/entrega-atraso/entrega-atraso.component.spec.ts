import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaAtrasoComponent } from './entrega-atraso.component';

describe('EntregaAtrasoComponent', () => {
  let component: EntregaAtrasoComponent;
  let fixture: ComponentFixture<EntregaAtrasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaAtrasoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaAtrasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
