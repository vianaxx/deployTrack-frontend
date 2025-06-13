import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployFilterComponent } from './deploy-filter.component';

describe('DeployFilterComponent', () => {
  let component: DeployFilterComponent;
  let fixture: ComponentFixture<DeployFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeployFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
