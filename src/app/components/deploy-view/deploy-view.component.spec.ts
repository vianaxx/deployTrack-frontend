import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployViewComponent } from './deploy-view.component';

describe('DeployViewComponent', () => {
  let component: DeployViewComponent;
  let fixture: ComponentFixture<DeployViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeployViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
