import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployDetailComponent } from './deploy-detail.component';

describe('DeployDetailComponent', () => {
  let component: DeployDetailComponent;
  let fixture: ComponentFixture<DeployDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeployDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
