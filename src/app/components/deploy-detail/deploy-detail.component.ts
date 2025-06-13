import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DeployLog, DeployService} from '../../services/deploy.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-deploy-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './deploy-detail.component.html',
  styleUrl: './deploy-detail.component.scss'
})
export class DeployDetailComponent implements OnInit{

  form!: FormGroup;

  isEditMode = false;
  deployId?: number;

  constructor(
    private fb: FormBuilder,
    private deployService: DeployService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path;

    if (path === 'deploys/new') {
      this.isEditMode = false;
    } else if (path === 'deploys/edit/:id') {
      this.isEditMode = true;
    }

    this.form = this.fb.group({
      application: ['', Validators.required],
      version: ['', Validators.required],
      environment: ['', Validators.required],
      author: ['', Validators.required],
      status: ['', Validators.required],
      timestamp: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deployId = +id;
      this.deployService.getDeployById(this.deployId).subscribe({
        next: (deploy) => {
          this.form.patchValue(deploy);
        },
        error: () => alert('Erro ao carregar deploy'),
      });
    }
  }




  onSubmit(): void {
    if (this.form.invalid) return

    if (this.form.invalid) {
      console.warn('Formulário inválido:', this.form.errors, this.form.value);
      return;
    }


    const deploy: DeployLog = this.form.value;

    if (this.isEditMode) {
      this.deployService.updateDeploy(this.deployId!, deploy).subscribe(() => {
        this.router.navigate(['/deploys']);
      });
    } else {
      this.deployService.createDeploy(deploy).subscribe(() => {
        this.router.navigate(['/deploys']);
      });
    }
  }

}
