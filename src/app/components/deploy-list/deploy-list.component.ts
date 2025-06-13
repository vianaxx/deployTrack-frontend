import {Component, OnInit} from '@angular/core';
import {DeployLog, DeployService} from '../../services/deploy.service';
import {RouterLink} from '@angular/router';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {DeployFilter, DeployFilterComponent} from '../deploy-filter/deploy-filter.component';

@Component({
  selector: 'app-deploy-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    DatePipe,
    DeployFilterComponent,
    NgClass
  ],
  templateUrl: './deploy-list.component.html',
  styleUrl: './deploy-list.component.scss'
})
export class DeployListComponent implements OnInit {

  deploys: DeployLog[] = [];
  filteredDeploys: DeployLog[] = [];
  loading = false;
  error = '';

  constructor(private deployService: DeployService) {
  }

  ngOnInit(): void {
    this.fetchDeploys();

    this.deployService.getAllDeploys().subscribe({
      next: (data) => {
        console.log('Deploys:', data);
      },
      error: (err) => {
        console.error('Erro:', err);
      }
    });

  }

  fetchDeploys(): void {
    this.loading = true;
    this.deployService.getAllDeploys().subscribe({
      next: (data) => {
        this.deploys = data;
        this.loading = false;
        this.deploys = data;
        this.filteredDeploys = data;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os deploys.';
        console.error(err);
        this.loading = false;

      }
    });
  }

  deleteDeploy(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este deploy?')) return;

    this.deployService.deleteDeploy(id).subscribe({
      next: () => this.fetchDeploys(),
      error: (err) => {
        this.error = 'Erro ao excluir o deploy.';
        console.error(err);
      }
    });
  }

  applyFilter(filter: DeployFilter): void {
    const parseDate = (value: string | null | undefined): Date | null =>
      value && value.trim() !== '' ? new Date(value) : null;

    const startDate = parseDate(filter.startDate);
    const endDate = parseDate(filter.endDate);

    this.filteredDeploys = this.deploys.filter(d => {
      const matchAuthor = filter.author ? d.author.toLowerCase().includes(filter.author.toLowerCase()) : true;
      const matchStatus = filter.status ? d.status === filter.status : true;

      const deployDate = new Date(d.timestamp);
      const matchStart = startDate ? deployDate >= startDate : true;
      const matchEnd = endDate ? deployDate <= endDate : true;

      return matchAuthor && matchStatus && matchStart && matchEnd;
    });

    console.log('Resultado do filtro:', this.filteredDeploys);
  }



}
