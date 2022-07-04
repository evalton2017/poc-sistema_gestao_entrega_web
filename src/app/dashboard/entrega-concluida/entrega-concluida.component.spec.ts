import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaConcluidaComponent } from './entrega-concluida.component';

describe('EntregaConcluidaComponent', () => {
  let component: EntregaConcluidaComponent;
  let fixture: ComponentFixture<EntregaConcluidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaConcluidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaConcluidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
