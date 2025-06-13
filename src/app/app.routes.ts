import {Routes} from '@angular/router';
import {DeployListComponent} from './components/deploy-list/deploy-list.component';
import {DeployDetailComponent} from './components/deploy-detail/deploy-detail.component';
import {DeployViewComponent} from './components/deploy-view/deploy-view.component';


export const routes: Routes = [

  { path: '',
    redirectTo: 'deploys',
    pathMatch: 'full' },

  {
    path: 'deploys',
    component: DeployListComponent,
  },
  {
    path: 'deploys/new',
    component: DeployDetailComponent,
  },
  {
    path: 'deploys/:id',
    component: DeployViewComponent,
  }
  ,
  {
    path: 'deploys/edit/:id',
    component: DeployDetailComponent,
  },
  {
    path: '**',
    redirectTo: "deploys",
  },


];
