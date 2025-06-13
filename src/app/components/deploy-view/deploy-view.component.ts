import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {DeployLog, DeployService} from '../../services/deploy.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-deploy-view',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './deploy-view.component.html',
  styleUrl: './deploy-view.component.scss'
})
export class DeployViewComponent implements OnInit{


  deploy?: DeployLog;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deployService: DeployService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deployService.getDeployById(+id).subscribe({
        next: (data) => {
          this.deploy = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar o deploy.';
          this.loading = false;
        },
      });
    } else {
      this.error = 'ID do deploy não informado.';
      this.loading = false;
    }
  }

  voltar(): void {
    this.router.navigate(['/deploys']);
  }

}
